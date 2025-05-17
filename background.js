console.log("GX-music-Daftpoe Safari Background Script Loaded");

let audioElement;
let currentTrack = '';
const playlist = [
    "t-one.mp3",
    "t-two.mp3",
    "t-three.mp3",
    "t-four.mp3",
    "t-five.mp3"
];
let currentTrackIndex = 0;

function ensureAudioElement() {
    if (!audioElement) {
        audioElement = new Audio();
        audioElement.addEventListener('ended', playNextTrack); // Play next track when current one ends
        // You could potentially append it to the background page's body if needed for some reason,
        // but it's often not necessary for playback itself.
        // document.body.appendChild(audioElement);
        console.log("Audio element created");
    }
}

function playTrack(trackName) {
    ensureAudioElement();
    const trackUrl = browser.runtime.getURL(trackName);
    console.log(`Attempting to play: ${trackName} from URL: ${trackUrl}`);
    audioElement.src = trackUrl;
    currentTrack = trackName;
    audioElement.play()
        .then(() => {
            console.log(`Successfully playing: ${trackName}`);
            browser.action.setBadgeText({ text: "▶" });
        })
        .catch(error => {
            console.error(`Error playing ${trackName}:`, error);
            browser.action.setBadgeText({ text: "ERR" });
        });
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    playTrack(playlist[currentTrackIndex]);
}

function stopTrack() {
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
        currentTrack = '';
        console.log("Track stopped");
        browser.action.setBadgeText({ text: "" });
    }
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in background:", message);
    if (message.action === "playMusic") {
        // If a specific track is requested, play it. Otherwise, play the current/next.
        const trackToPlay = message.track || playlist[currentTrackIndex];
        playTrack(trackToPlay);
        sendResponse({ status: "playing", track: currentTrack });
    } else if (message.action === "stopMusic") {
        stopTrack();
        sendResponse({ status: "stopped" });
    }
    return true; // Indicates you wish to send a response asynchronously
});

// Example: Clicking the browser action icon toggles play/stop for the first track or current
browser.action.onClicked.addListener((tab) => {
    if (audioElement && !audioElement.paused && currentTrack) {
        stopTrack();
    } else {
        playTrack(playlist[currentTrackIndex]);
    }
});

// Initialize badge
browser.action.setBadgeText({ text: "" });
browser.action.setBadgeBackgroundColor({ color: '#007AFF' }); // Blue, or your preferred color
