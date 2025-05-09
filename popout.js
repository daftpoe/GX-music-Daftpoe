// Remove direct audio control since it's now in the offscreen document
document.querySelector('button.play').addEventListener('click', function() {
  const selTrack = document.querySelector('select').value;
  chrome.runtime.sendMessage({ name: "playTrack", track: selTrack });
});

document.querySelector('button.pause').addEventListener('click', function() {
  chrome.runtime.sendMessage({ name: "pauseTrack" });
});

// Sync the UI with the current playback state when the popup opens
chrome.runtime.sendMessage({ name: "getAudioState" }, (state) => {
  if (state && state.currentTrack) {
    const select = document.querySelector('select');
    select.value = state.currentTrack;
  }
});