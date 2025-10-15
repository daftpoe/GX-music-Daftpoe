// Copyright (c) 2025 Daftpoe
// Licensed under the Apache License, Version 2.0

document.addEventListener('DOMContentLoaded', () => {
  const trackSelect = document.getElementById('trackSelect');
  const playButton = document.querySelector('.play');
  const pauseButton = document.querySelector('.pause');

  const canvas = document.getElementById('visualizer');
  const canvasCtx = canvas.getContext('2d');

  function draw() {
    requestAnimationFrame(draw);

    chrome.runtime.sendMessage({ action: 'get-visualization-data' }, (response) => {
      if (chrome.runtime.lastError || !response || !response.data) {
        return;
      }

      const dataArray = response.data;
      const bufferLength = dataArray.length;

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    });
  }

  draw();

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
