// Copyright (c) 2025 Daftpoe
// Licensed under the Apache License, Version 2.0

document.addEventListener('DOMContentLoaded', () => {
  const trackSelect = document.getElementById('trackSelect');
  const playButton = document.querySelector('.play');
  const pauseButton = document.querySelector('.pause');

  // Function to update the UI based on the current playback state
  function updateUI(state) {
    if (state.status === 'playing') {
      playButton.disabled = true;
      pauseButton.disabled = false;
    } else {
      playButton.disabled = false;
      pauseButton.disabled = true;
    }
    trackSelect.value = state.track;
  }

  // Get the current state from the background script and update the UI
  chrome.runtime.sendMessage({ action: 'get-state' }, (response) => {
    if (response) {
      updateUI(response);
    }
  });

  // Event listeners for the play and pause buttons
  playButton.addEventListener('click', () => {
    const selectedTrack = trackSelect.value;
    chrome.runtime.sendMessage({ action: 'play', track: selectedTrack }, (response) => {
      if (response) {
        updateUI(response);
      }
    });
  });

  pauseButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'pause' }, (response) => {
      if (response) {
        updateUI(response);
      }
    });
  });

  // Listen for track changes from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'track-changed') {
      trackSelect.value = message.track;
    }
  });
});
