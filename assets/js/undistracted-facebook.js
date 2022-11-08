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
    ['facebookSettings', 'generalSettings'],
    ({ facebookSettings, generalSettings }) => {
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
      if (facebookSettings.feed.value) {
        css += `
      .home .newsFeedComposer #contentArea, #m_newsfeed_stream, #MComposer, #MStoriesTray, [role="main"]:not([aria-label="Search Results"]):not([aria-label="Search results"]) div:not([data-pagelet="GroupFeed"])>[role="feed"], [data-pagelet="Stories"] {
        display: none !important;
      }
      [role="main"] [role="article"]{
        display: none !important;
      }
      [role="main"] [role="tablist"]{
        display: none !important;
      }
      [role="main"] div[class="x1hc1fzr x1unhpq9 x6o7n8i"]{
        display: none !important;
      }
      [role="main"] div[aria-label="Create a post"][role="region"]{
        display: none !important;
      }
      [role="main"] div[aria-label="Stories"][role="region"]{
        display: none !important;
      }
      [aria-label="List of Groups"] ~ div [role="main"] [role="feed"][role="feed"][role="feed"], div [data-pagelet="GroupFeed"] [role="feed"] {
        display: initial !important;
      }
      `;
      }

      // Hide Navigation at the top
      if (facebookSettings.topNavigation.value) {
        css += `
        [aria-label="Facebook"][role="navigation"]{
          display: none !important;
        }
      `;
      }
      
      // Hide shortcut
      if (facebookSettings.shortcut.value) {
        css += `
        [role="navigation"] div[class="x1iyjqo2"]>div:nth-of-type(2){
          display: none !important;
        }
      `;
      }

       // Hide Left Navigation
       if (facebookSettings.leftnavigation.value) {
        css += `
        [role="navigation"] div[class="x1iyjqo2"]>ul:nth-of-type(1){
          display: none !important;
        }
        [role="navigation"] div[class="x1iyjqo2"]>div:nth-of-type(1){
          display: none !important;
        }
        footer[role="contentinfo"][aria-label="Facebook"]{
          display: none !important;
        }
            `;
      }


      // Hide Chat Sidebar
      if (facebookSettings.chatSidebar.value) {
        css += `
      .fbChatSidebar, #BuddylistPagelet, [data-pagelet="ChatTab"], [aria-label="New Message"], [aria-label="New message"] {
        display: none !important;
      }
      [role="complementary"]{
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