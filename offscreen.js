// Copyright (c) 2025 Daftpoe
// Licensed under the Apache License, Version 2.0

// This script handles all audio playback for the extension.
// It is run in an offscreen document to allow for background audio.

const audio = document.getElementById('audioElement');
audio.volume = 0.3;

// The playlist of available tracks
const playlist = {
  'one': 't-one.mp3',
  'two': 't-two.mp3',
  'three': 't-three.mp3',
  'four': 't-four.mp3',
  'five': 't-five.mp3',
};

let currentTrack = 'one'; // Default to the first track

// Function to play a track
function playTrack(track, volume) {
  currentTrack = track;
  audio.src = playlist[track];
  if (volume) {
    audio.volume = volume;
  }
  audio.play().catch(err => {
    if (err.name !== 'AbortError') {
      console.error("Audio play failed:", err);
    }
  });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'play':
      playTrack(message.track || currentTrack, message.volume);
      sendResponse({ status: 'playing', track: currentTrack, volume: audio.volume });
      break;
    case 'pause':
      audio.pause();
      sendResponse({ status: 'paused', track: currentTrack });
      break;
    case 'get-state':
      sendResponse({ 
        status: audio.paused ? 'paused' : 'playing', 
        track: currentTrack, 
        volume: audio.volume 
      });
      break;
    case 'set-volume':
      audio.volume = message.volume;
      break;
  }
  return true; // Keep the message channel open for async response
});

// When a track ends, play it again
audio.addEventListener('ended', () => {
  playTrack(currentTrack, audio.volume);
});