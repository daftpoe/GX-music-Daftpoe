console.log("GX Music Service Worker Started");

// Function to create the offscreen document if it doesn't exist
async function createOffscreenDocument() {
  if (await chrome.offscreen.hasDocument?.()) return;
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['AUDIO_PLAYBACK'],
    justification: 'Playing background music for the GX Music extension'
  });
}

// Ensure the offscreen document is created on startup
createOffscreenDocument();

// State to track playback
let shouldAutoPlay = false;
let currentTrack = null;
let isOtherAudioLikelyPlaying = false;

// List of domains likely to play audio
const audioDomains = [
  'youtube.com',
  'spotify.com',
  'soundcloud.com',
  'netflix.com',
  'vimeo.com'
];

// Monitor tab navigation to approximate audio playback
chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId !== 0) return; // Ignore subframes

  const url = new URL(details.url);
  const isAudioDomain = audioDomains.some(domain => url.hostname.includes(domain));

  if (isAudioDomain) {
    // Likely audio playback, pause the music
    isOtherAudioLikelyPlaying = true;
    if (shouldAutoPlay) {
      chrome.runtime.sendMessage({ action: "pauseTrack" });
    }
  } else {
    // Not an audio domain, resume if we should be playing
    isOtherAudioLikelyPlaying = false;
    if (shouldAutoPlay && currentTrack) {
      chrome.runtime.sendMessage({ action: "playTrack", track: currentTrack });
    }
  }
});

// Monitor tab closure to resume playback if no audio domains are open
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.tabs.query({}, (tabs) => {
    const hasAudioDomain = tabs.some(tab => {
      if (!tab.url) return false;
      const url = new URL(tab.url);
      return audioDomains.some(domain => url.hostname.includes(domain));
    });

    if (!hasAudioDomain && shouldAutoPlay && currentTrack) {
      isOtherAudioLikelyPlaying = false;
      chrome.runtime.sendMessage({ action: "playTrack", track: currentTrack });
    }
  });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.name === "playTrack") {
    console.log(`Playing track: ${msg.track}`);
    currentTrack = msg.track;
    shouldAutoPlay = true;
    if (!isOtherAudioLikelyPlaying) {
      chrome.runtime.sendMessage({
        action: "playTrack",
        track: msg.track
      });
    }
  }

  if (msg.name === "pauseTrack") {
    console.log("Track paused");
    shouldAutoPlay = false;
    chrome.runtime.sendMessage({ action: "pauseTrack" });
  }

  if (msg.name === "getAudioState") {
    chrome.runtime.sendMessage({ action: "getAudioState" }, (state) => {
      sendResponse(state);
    });
    return true;
  }
});