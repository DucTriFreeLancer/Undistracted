'use strict';
/* global chrome */
chrome.runtime.onMessage.addListener(function(message) {
  runContentScript();
});

runContentScript();

function runContentScript() {
  var css = '';
  const currentTime =
    new Date()
      .getHours()
      .toString()
      .padStart(2, '0') +
    ':' +
    new Date()
      .getMinutes()
      .toString()
      .padStart(2, '0');

  chrome.storage.sync.get(
    ['redditSettings', 'generalSettings'],
    ({ redditSettings, generalSettings }) => {
      const fromTime = generalSettings.disableDuringHours.value.fromTime;
      const toTime = generalSettings.disableDuringHours.value.toTime;
      // Remove existing and add new
      var existingStyle = document.getElementById('undistracted-style');
      if (existingStyle) {
        existingStyle.remove();
      }

      if (
        generalSettings.disableFilters.value ||
        generalSettings.disableFiltersTemporary.value.active ||
        (generalSettings.disableDuringHours.value.active &&
          (fromTime < toTime
            ? fromTime <= currentTime && currentTime < toTime
            : (fromTime <= currentTime && currentTime <= '23:59') ||
              ('00:00' <= currentTime && currentTime < toTime)))
      ) {
        return;
      }

      // Hide Feed
      if (redditSettings.feed.value) {
        css += `
        .ListingLayout-outerContainer div[class="wBtTDilkW_rtT2k5x3eie"] {
            display: none !important;
        }
        .ListingLayout-outerContainer div[data-testid="post-container"] {
            display: none !important;
        }
      `;
      }

      // Hide Front Page
      if (redditSettings.rightSideBar.value) {
        css += `
      .ListingLayout-outerContainer div[data-testid="frontpage-sidebar"] {
        display: none !important;
      }

      `;
      }

      // Hide Popular
      if (redditSettings.createPost.value) {
        css += `
        div[class="_2jJNpBqXMbbyOiGCElTYxZ"]:has(input[name="createPost"]) {
            display: none !important;
        }
      `;
      }

      // Hide All
      if (redditSettings.topNavigation.value) {
        css += `
        header {
        display: none !important;
      }
      `;
      }

      var style = document.createElement('style');
      style.setAttribute('id', 'undistracted-style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    }
  );
}
