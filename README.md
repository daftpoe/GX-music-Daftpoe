# GX-music-Daftpoe

This Chrome extension plays background music in the GX Browser. It has been optimized for robustness, maintainability, and efficiency.

## Features

- **Volume Control:** Adjust the music volume using the slider in the popup.
- **Track Repetition:** The current track will repeat until a new one is selected.

## Optimizations

The following optimizations have been made:

- **Refactored Audio Logic:** All audio playback is now handled by `offscreen.js` to prevent conflicts and improve performance.
- **Standardized Messaging:** A clear messaging system is in place between the popup, background, and offscreen scripts for more reliable communication.
- **Improved State Management:** The offscreen script now manages all audio-related state, making the code easier to reason about.
- **Cleaned Up `manifest.json`:** Unused permissions and a duplicate key have been removed to improve security and reduce the extension's footprint.
- **Improved Code Quality:** Consistent license headers have been added, and the code has been refactored for clarity and consistency.
