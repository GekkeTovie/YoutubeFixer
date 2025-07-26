// ==UserScript==
// @name         YouTube Fullscreen UI Cleaner & Fixer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Cleans fullscreen grid UI on YouTube, fixes control bar, and disables scroll on video. Enforces removal of fullscreen overlay.
// @author       GekkeTovie
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Apply styles safely with optional !important
    function applyStyles(selector, styles, importantProps = {}) {
        const element = document.querySelector(selector);
        if (element) {
            for (const property in styles) {
                if (styles.hasOwnProperty(property)) {
                    element.style.setProperty(
                        property,
                        styles[property],
                        importantProps[property] ? 'important' : ''
                    );
                }
            }
        }
    }

    function blockScrollOnVideo() {
        const video = document.querySelector('video.video-stream.html5-main-video');
        if (video && !video.hasAttribute('data-scroll-blocked')) {
            video.addEventListener('wheel', (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, { passive: false });
            video.setAttribute('data-scroll-blocked', 'true');
        }
    }

    function cleanYouTubeUI() {
        const selectorsToRemove = [
            '.ytp-fullscreen-grid-hover-overlay',
            '.ytp-fullscreen-grid-stills-container',
            '.ytp-fullscreen-grid-header',
            '.ytp-fullscreen-grid-main-content'
        ];

        // Force remove specific elements
        selectorsToRemove.forEach(sel => {
            const elements = document.querySelectorAll(sel);
            elements.forEach(el => el.remove());
        });

        // Style adjustments
        applyStyles('.ytp-chrome-controls', {
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0'
        });

        applyStyles('.ytp-chrome-bottom', {
            bottom: '0'
        }, { bottom: true });

        blockScrollOnVideo();
    }

    // MutationObserver to constantly delete re-inserted fullscreen overlay
    const observer = new MutationObserver(() => {
        const overlay = document.querySelector('.ytp-fullscreen-grid-hover-overlay');
        if (overlay) overlay.remove();
    });

    window.addEventListener('DOMContentLoaded', () => {
        cleanYouTubeUI();
        observer.observe(document.body, { childList: true, subtree: true });
    });

    window.addEventListener('load', cleanYouTubeUI);
    document.addEventListener('fullscreenchange', cleanYouTubeUI);
    setInterval(cleanYouTubeUI, 7000);
})();
