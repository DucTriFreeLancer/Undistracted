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
    ['tiktokSettings', 'generalSettings'],
    ({ tiktokSettings, generalSettings }) => {
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
      if (tiktokSettings.feed.value) {
        css += `
        div[class*='-DivBodyContainer'] div[class^='tiktok-'][class*='-DivMainContainer'] div[data-e2e="recommend-list-item-container"] {
            display: none !important;
        }
      `;
      }
      // Hide Suggested accounts
      if (tiktokSettings.suggestedAccount.value) {
        css += `
        div[class^='tiktok-'][class*='-DivUserContainer']:has(p[data-e2e="suggest-accounts"])  {
            display: none !important;
        }
      `;
      }

      // Hide following Account
      if (tiktokSettings.followingAccount.value) {
        css += `
        div[class^='tiktok-'][class*='-DivUserContainer']:has(p[data-e2e="following-accounts"])  {
            display: none !important;
        }
      `;
      }

      // Hide discover
      if (tiktokSettings.discover.value) {
        css += `
        div[class^='tiktok-'][class*='-DivDiscoverContainer']:has(p[data-e2e="nav-discover-title"])  {
          display: none !important;
        }
      `;
      }
      
      // Hide navigation
      if (tiktokSettings.navigation.value) {
        css += `
        div[class*='-DivHeaderWrapperMain'] a[data-e2e="tiktok-logo"] {
            display: none !important;
        }
        div[class*='-DivWrapper'] div[class^='tiktok-'][class*='-DivMainNavContainer']  {
            display: none !important;
        }
      `;
      }
      
      // Hide search
      if (tiktokSettings.search.value) {
        css += `
        div[class*='-DivHeaderCenterContainer'] div[class^='tiktok-'][class*='-DivSearchFormContainer'] {
            display: none !important;
        }
        div[class*='-DivHeaderRightContainer'] div[class^='tiktok-'][class*='-DivUploadContainer'] {
            display: none !important;
        }
            `;
      }

      // Hide Direct Messages
      if (tiktokSettings.directMessage.value) {
        css += `
        div[class*='-DivHeaderRightContainer'] div[class^='tiktok-'][class*='-DivMessageIconContainer'] {
            display: none !important;
        }
            `;
      }

      // Remove notifications
      if (tiktokSettings.notifications.value) {
        css += `
        div[class*='-DivHeaderRightContainer'] div[class^='tiktok-'][class*='-DivHeaderInboxContainer'] {
            display: none !important;
        }
      `;
      }
      // Remove account
      if (tiktokSettings.account.value) {
        css += `
        div[class*='-DivHeaderRightContainer'] div[class^='tiktok-'][class*='-DivProfileContainer'] {
            display: none !important;
        }
      `;
      }

      // Hide footer
      if (tiktokSettings.footer.value) {
        css += `
        div[class^='tiktok-'][class*='-DivFooterContainer'] {
          display: none !important;
      }
      div[class*='-DivBodyContainer'] div[class^='tiktok-'][class*='-DivMainContainer'] div[class*='-DivBottomContainer'] {
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