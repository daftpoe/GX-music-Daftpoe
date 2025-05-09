// Copyright (c) 2025 Daftpoe
// Licensed under the Apache License, Version 2.0

const audio = document.getElementById('audioElement');
audio.loop = true;

// Listen for messages from the service worker to control audio
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "playTrack") {
    audio.src = `t-${message.track}.mp3`;
    audio.play().catch(err => {
      console.error("Audio play failed:", err);
    });
  } else if (message.action === "pauseTrack") {
    audio.pause();
  } else if (message.action === "getAudioState") {
    sendResponse({
      isPlaying: !audio.paused,
      currentTrack: audio.src ? audio.src.split('/').pop().replace('.mp3', '').replace('t-', '') : null
    });
  }
});

// Notify the service worker if audio ends naturally
audio.addEventListener('ended', () => {
  chrome.runtime.sendMessage({ action: "trackEnded" });
});