# GX-music-Daftpoe

This Chrome extension plays background music in the GX Browser. It has been optimized for robustness, maintainability, and efficiency.

## Features

- **Volume Control:** Adjust the music volume using the slider in the popup.
- **Track Repetition:** The current track will repeat until a new one is selected.

## Installation
1. Clone or download this repository:
   ```bash
   git clone https://github.com/daftpoe/GX-music-Daftpoe.git
   ```
Alternatively, download the latest release from the Releases page as a .zip file and extract it.

2. Go to chrome://extensions/ in Chrome.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the GX-music-Daftpoe folder (or the extracted folder from the release).

## Usage
1. Click the extension icon in Chrome to open the popup.
2. Select a track from the dropdown (e.g., "Berlinist - Evolve").
3. Click "Play" to start the music. The music will continue playing even if you close the popup.
4. The music will automatically pause when you visit sites like YouTube or Spotify and resume when you leave.

## Contributing
Contributions are welcome! If you’d like to contribute:

1. Fork this repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Make your changes and commit them (git commit -m "Add your feature").
4. Push to your branch (git push origin feature/your-feature).
5. Open a pull request.

Please ensure your contributions align with the Apache License 2.0.

## Optimizations

The following optimizations have been made:

- **Refactored Audio Logic:** All audio playback is now handled by `offscreen.js` to prevent conflicts and improve performance.
- **Standardized Messaging:** A clear messaging system is in place between the popup, background, and offscreen scripts for more reliable communication.
- **Improved State Management:** The offscreen script now manages all audio-related state, making the code easier to reason about.
- **Cleaned Up `manifest.json`:** Unused permissions and a duplicate key have been removed to improve security and reduce the extension's footprint.
- **Improved Code Quality:** Consistent license headers have been added, and the code has been refactored for clarity and consistency.