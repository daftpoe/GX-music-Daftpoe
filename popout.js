// Copyright (c) 2025 Daftpoe
// Licensed under the Apache License, Version 2.0

document.addEventListener('DOMContentLoaded', () => {
  const trackSelect = document.getElementById('trackSelect');
  const playButton = document.querySelector('.play');
  const pauseButton = document.querySelector('.pause');

  const volumeSlider = document.getElementById('volumeSlider');

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
    volumeSlider.value = state.volume;
  }

  // Get the current state from the background script and update the UI
  chrome.runtime.sendMessage({ action: 'get-state' }, (response) => {
    if (chrome.runtime.lastError) {
      // This can happen if the offscreen document is not yet ready.
      console.warn(chrome.runtime.lastError.message);
      return;
    }
    if (response) {
      updateUI(response);
    }
  });

  // Event listeners for the play and pause buttons
  playButton.addEventListener('click', () => {
    const selectedTrack = trackSelect.value;
    const volume = volumeSlider.value;
    chrome.runtime.sendMessage({ action: 'play', track: selectedTrack, volume: volume }, (response) => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
        return;
      }
      if (response) {
        updateUI(response);
      }
    });
  });

  pauseButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'pause' }, (response) => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
        return;
      }
      if (response) {
        updateUI(response);
      }
    });
  });

  volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value;
    chrome.runtime.sendMessage({ action: 'set-volume', volume: volume });
  });

  trackSelect.addEventListener('change', () => {
    const selectedTrack = trackSelect.value;
    const volume = volumeSlider.value;
    chrome.runtime.sendMessage({ action: 'play', track: selectedTrack, volume: volume }, (response) => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
        return;
      }
      if (response) {
        updateUI(response);
      }
    });
  });


});
