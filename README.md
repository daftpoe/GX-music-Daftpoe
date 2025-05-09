# ![GX-music-Daftpoe](logo_sm.png) GX-music-Daftpoe

[![GitHub release](https://img.shields.io/github/v/release/daftpoe/GX-music-Daftpoe)](https://github.com/daftpoe/GX-music-Daftpoe/releases)

A Chrome extension that plays background music, inspired by Opera GX's background music feature. This is a modified version of the original [GX Music](https://github.com/mbs0ft/GX-music) by [mbs0ft](https://github.com/mbs0ft).

## Demo
![GX-music-Daftpoe Popup](screenshot.png)
*Select a track and play background music directly in Chrome!*

## Features
- Plays ambient music from Opera GX in Chrome using an offscreen document (Manifest V3).
- Automatically pauses music when navigating to audio-heavy sites (e.g., YouTube, Spotify) and resumes when leaving.
- Supports multiple tracks with a simple popup interface.
- Lightweight and compatible with modern Chrome versions.

## Changes from the Original
- Migrated to Manifest V3 for compatibility with modern Chrome versions.
- Moved audio playback to an offscreen document for persistent playback (music continues even when the popup closes).
- Added logic to pause/resume music based on tab activity (e.g., pauses on YouTube, resumes when leaving).
- Renamed to `GX-music-Daftpoe`.

## Installation
1. Clone or download this repository:
   ```bash
   git clone https://github.com/daftpoe/GX-music-Daftpoe.git

Alternatively, download the latest release from the Releases page as a .zip file and extract it.

2. Go to chrome://extensions/ in Chrome.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the GX-music-Daftpoe folder (or the extracted folder from the release).

## Usage
1. Click the extension icon in Chrome to open the popup.
2. Select a track from the dropdown (e.g., "Berlinist - Evolve").
3. Click "Play" to start the music. The music will continue playing even if you close the popup.
4. The music will automatically pause when you visit sites like YouTube or Spotify and resume when you leave.

## Todo
- Add a volume slider.
- Improve the popup design for a better user experience.
- Explore adaptive sounds (e.g., more sounds from typing and clicking, as in the original Opera GX feature).

## Contributing
Contributions are welcome! If you’d like to contribute:

1. Fork this repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Make your changes and commit them (git commit -m "Add your feature").
4. Push to your branch (git push origin feature/your-feature).
5. Open a pull request.

Please ensure your contributions align with the Apache License 2.0.

## Changelog

### Version 0.0.2 (2025-05-08)
- Fixed an issue where a Cloudflare script was injected into `popout.html`, which could cause CSP violations.
- Updated the `<title>` in `popout.html` to "GX-music-Daftpoe" for consistency.\

### Version 0.0.1 (2025-05-08)

- Initial release of GX-music-Daftpoe.
- Migrated to Manifest V3.
- Added offscreen document for persistent audio playback.
- Implemented tab activity monitoring to pause/resume music.

## Credits
- Original project: GX Music by mbs0ft.
- Modified by Daftpoe in 2025.

## License
This project is licensed under the Apache License, Version 2.0, as inherited from the original GX Music repository. See  for details.

Copyright (c) 2025 Daftpoe (for modifications)