# 🎬 YouTube Fullscreen UI Cleaner & Fixer

A Tampermonkey user script that removes annoying fullscreen grid overlays on YouTube, disables accidental scrolling on videos, and repositions the control bar to behave more naturally in fullscreen mode.

---

## ✨ Features

- ✅ Removes:
  - `ytp-fullscreen-grid-hover-overlay`
  - `ytp-fullscreen-grid-stills-container`
  - `ytp-fullscreen-grid-header`
  - `ytp-fullscreen-grid-main-content`
- ✅ Repositions `.ytp-chrome-controls` and `.ytp-chrome-bottom` to always sit at the bottom of the screen
- ✅ Disables scroll events on the video element (no more accidental zoom or scroll)
- ✅ Uses MutationObserver and timed intervals to **persistently** remove overlays even if YouTube re-inserts them

---

## 📦 Installation

### Tampermonkey Users

1. Make sure you have [Tampermonkey](https://www.tampermonkey.net/) installed in your browser
2. Click the link below to install the script:

👉 [Install YouTube Fullscreen UI Cleaner](https://github.com/GekkeTovie/YoutubeFixer/raw/refs/heads/main/YouTube%20Fullscreen%20UI%20Cleaner-0.2.user.js)

---

## 🧠 How it Works

- On YouTube pages, the script removes specified overlay elements and blocks their reappearance using MutationObserver
- Adjusts CSS to bring control bars to the proper place
- Blocks scroll events from interfering with video playback (wheel zoom)

---

## 🛠️ Author

**GekkeTovie**  
Made for people who just want fullscreen to be fullscreen.

---

## 📬 Feedback or Issues?

Feel free to open an issue or pull request on the [GitHub repo](https://github.com/GekkeTovie/YoutubeFixer) if you'd like to contribute or report bugs.

---

> YouTube is constantly changing its UI. This script will be updated as needed to match those changes. If something breaks, just yell at me on GitHub or open a PR 😄
