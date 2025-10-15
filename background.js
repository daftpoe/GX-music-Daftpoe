// Copyright (c) 2025 Daftpoe
// Licensed under the Apache License, Version 2.0

// This script acts as the central controller for the extension.
// It creates and manages the offscreen document where audio is played.

// Path to the offscreen document
const OFFSCREEN_DOCUMENT_PATH = 'offscreen.html';

// A global promise to ensure the offscreen document is created only once
let creating;

// Function to ensure the offscreen document is created and ready
async function setupOffscreenDocument() {
  // Check if the offscreen document is already available
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT']
  });

  if (existingContexts.length > 0) {
    return;
  }

  // If not, create it
  if (creating) {
    await creating;
  } else {
    creating = chrome.offscreen.createDocument({
      url: OFFSCREEN_DOCUMENT_PATH,
      reasons: ['AUDIO_PLAYBACK'],
      justification: 'To play background music for the user.',
    });
    await creating;
    creating = null;
  }
}

// Listen for messages from other parts of the extension (e.g., popup)
let userHasPaused = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'pause') {
    userHasPaused = true;
  } else if (message.action === 'play') {
    userHasPaused = false;
  }

  (async () => {
    await setupOffscreenDocument();
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
        return;
      }
      sendResponse(response);
    });
  })();
  return true;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.audible === true) {
    chrome.runtime.sendMessage({ action: 'pause' });
  } else if (changeInfo.audible === false && !userHasPaused) {
    chrome.tabs.query({ audible: true }, (tabs) => {
      if (tabs.length === 0) {
        chrome.runtime.sendMessage({ action: 'play' });
      }
    });
  }
});
