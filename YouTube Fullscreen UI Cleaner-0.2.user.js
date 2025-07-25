// ==UserScript==
// @name         YouTube Fullscreen UI Cleaner
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Removes fullscreen grid overlays, headers, and disables scroll on YouTube video in fullscreen. Also fixes chrome bottom bar.
// @author       GekkeTovie
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function cleanYouTubeUI() {
        // 1. Remove .ytp-fullscreen-grid-hover-overlay
        const hoverOverlay = document.querySelector('.ytp-fullscreen-grid-hover-overlay');
        if (hoverOverlay) hoverOverlay.remove();

        // 2. Remove .ytp-fullscreen-grid-stills-container
        const stillsContainer = document.querySelector('.ytp-fullscreen-grid-stills-container');
        if (stillsContainer) stillsContainer.remove();

        // 3. Remove .ytp-fullscreen-grid-header
        const gridHeader = document.querySelector('.ytp-fullscreen-grid-header');
        if (gridHeader) gridHeader.remove();

        // 4. Prevent scroll on video element
        const videoElement = document.querySelector('video.video-stream.html5-main-video');
        if (videoElement && !videoElement.hasAttribute('data-scroll-blocked')) {
            videoElement.addEventListener('wheel', (event) => {
                event.preventDefault();
                event.stopPropagation();
            }, { passive: false });
            videoElement.setAttribute('data-scroll-blocked', 'true');
        }

        // 5. Apply CSS to .ytp-chrome-bottom
        const chromeBottom = document.querySelector('.ytp-chrome-bottom');
        if (chromeBottom) {
            chromeBottom.style.setProperty('bottom', '0', 'important');
        }
    }

    // Run on DOMContentLoaded and page load
    window.addEventListener('DOMContentLoaded', cleanYouTubeUI);
    window.addEventListener('load', cleanYouTubeUI);

    // Run every 7 seconds in case elements reappear
    setInterval(cleanYouTubeUI, 7000);

    // Also run on fullscreen change
    document.addEventListener('fullscreenchange', cleanYouTubeUI);

    // Run on DOM mutations
    const observer = new MutationObserver(cleanYouTubeUI);
    observer.observe(document.body, { childList: true, subtree: true });
})();