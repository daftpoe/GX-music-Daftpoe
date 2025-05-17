// In your popout.js
// To play the first track (or a specific track)
browser.runtime.sendMessage({ action: "playMusic", track: "t-one.mp3" });

// Or to just toggle/start playback without specifying a track (relies on background's currentTrackIndex)
browser.runtime.sendMessage({ action: "playMusic" });

// To stop
browser.runtime.sendMessage({ action: "stopMusic" });
