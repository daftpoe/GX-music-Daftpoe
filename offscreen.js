// Copyright (c) 2025 Daftpoe
// Licensed under the Apache License, Version 2.0

// This script handles all audio playback for the extension.
// It is run in an offscreen document to allow for background audio.

const audio = document.getElementById('audioElement');

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
function playTrack(track) {
  currentTrack = track;
  audio.src = playlist[track];
  audio.play().catch(err => {
    console.error("Audio play failed:", err);
  });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'play':
      playTrack(message.track || currentTrack);
      sendResponse({ status: 'playing', track: currentTrack });
      break;
    case 'pause':
      audio.pause();
      sendResponse({ status: 'paused', track: currentTrack });
      break;
    case 'get-state':
      sendResponse({ 
        status: audio.paused ? 'paused' : 'playing', 
        track: currentTrack 
      });
      break;
  }
  return true; // Keep the message channel open for async response
});

// When a track ends, play the next one in the playlist
audio.addEventListener('ended', () => {
  const trackIds = Object.keys(playlist);
  const currentIndex = trackIds.indexOf(currentTrack);
  const nextIndex = (currentIndex + 1) % trackIds.length;
  currentTrack = trackIds[nextIndex];
  playTrack(currentTrack);

  // Notify other parts of the extension that the track has changed
  chrome.runtime.sendMessage({ action: 'track-changed', track: currentTrack });
});