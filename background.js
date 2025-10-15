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
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  // Ensure the offscreen document is set up before processing messages
  await setupOffscreenDocument();

  // Forward the message to the offscreen document
  const response = await chrome.runtime.sendMessage(message);
  
  // Send the response back to the original sender
  sendResponse(response);
});

// Optional: Add a listener for when the extension is first installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log('GX-music-Daftpoe extension installed.');
  // You could perform initial setup here if needed
});
