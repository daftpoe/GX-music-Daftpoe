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