// Avoid circular
const fallbackUrl = 'https://www.google.com';
var myTimer;

const relatedDomains = {
  facebook: ['facebook.com', 'fb.com'],
  youtube: ['youtube.com', 'youtu.be'],
  tiktok: ['tiktok.com'],
  instagram: ['instagram.com'],
  twitter: [
    'twitter.com',
    'twimg.com',
    'twttr.net',
    'twttr.com',
    'abs.twimg.com',
  ],
  reddit: ['reddit.com', 'old.reddit.com'],
  netflix: ['netflix.com'],
  linkedin: ['linkedin.com'],
};

const allSettings = {
  facebookSettings: {
    blockSite: {
      value: false,
      description: 'Block Facebook',
      tooltip: 'Block all access to Facebook domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
      color:"primary"
    },
    feed: {
      value: false,
      description: 'Hide Feed',
      tooltip: 'Hides your news feed',
      order: 1,
      type: 'switch',
      color:"primary"

    },
    likesComments: {
      value: false,
      description: 'Hide Likes and Comments',
      tooltip: 'Hides Likes and Comments section from all posts',
      order: 2,
      type: 'switch',
      color:"primary"
    },
    chatSidebar: {
      value: false,
      description: 'Hide Chat Sidebar',
      tooltip: 'Hides Chat sidebar on the right side',
      order: 3,
      type: 'switch',
      color:"primary"
    },
    watchFeed: {
      value: false,
      description: 'Hide Watch Feed',
      tooltip: 'Hides Watch button and Feed',
      order: 4,
      type: 'switch',
      color:"primary"
    },
    marketplace: {
      value: false,
      description: 'Hide Marketplace',
      tooltip: 'Hides Marketplace shortcut and blocks access',
      order: 5,
      type: 'switch',
      color:"primary"
    },
    stories: {
      value: false,
      description: 'Hide Stories',
      tooltip: 'Hides Stories panel from homepage',
      order: 6,
      type: 'switch',
      color:"primary"
    },
    color: {
      value: false,
      description: 'Remove colors',
      tooltip: 'Turns everything grey',
      order: 7,
      type: 'switch',
      enabled: false,
      color:"primary"
    },
  },
  youtubeSettings: {
    blockSite: {
      value: false,
      description: 'Block YouTube',
      tooltip: 'Block all access to YouTube domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
      color:"danger"
    },
    recommendations: {
      value: false,
      description: 'Hide Recommendations',
      tooltip: "Hides all videos recommended by YouTube's algorithm",
      order: 1,
      type: 'switch',
      color:"danger"
    },
    redirectToSubscriptions: {
      value: false,
      description: 'Force redirect to my subscriptions',
      tooltip: "Always redirect YouTube's homepage to my subscriptions feed",
      order: 2,
      type: 'switch',
      color:"danger"
    },
    breakingNews: {
      value: false,
      description: 'Hide Breaking News',
      tooltip: 'Hides breaking news and other recommended sections',
      order: 3,
      type: 'switch',
      color:"danger"
    },
    sidebar: {
      value: false,
      description: 'Hide Sidebar',
      tooltip: 'Hides sidebar with shortcuts to other YouTube pages',
      order: 4,
      type: 'switch',
      color:"danger"
    },
    comments: {
      value: false,
      description: 'Hide Comments',
      tooltip: 'Hides comments section from videos',
      order: 5,
      type: 'switch',
      color:"danger"
    },
    thumbnail: {
      value: 0,
      description: 'Blur/Hide Thumbnails',
      tooltip: 'Blurs/Hides Video Thumbnail',
      order: 6,
      type: 'switch-multi',
      color:"danger"
    },
    upNext: {
      value: false,
      description: 'Hide Up Next Suggestions',
      tooltip: 'Hide suggested videos after and during the video',
      order: 7,
      type: 'switch',
      color:"danger"
    },
  },
  tiktokSettings: {
    blockSite: {
      value: false,
      description: 'Block Tiktok',
      tooltip: 'Block all access to Tiktok domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
      color:"dark"
    },
    feed: {
      value: false,
      description: 'Hide Feed',
      tooltip: 'Hides your news feed',
      order: 1,
      type: 'switch',
      color:"dark"

    },
    suggestedAccount: {
      value: false,
      description: 'Hide Suggested Accounts',
      tooltip: 'Hide Suggested Accounts',
      order: 2,
      type: 'switch',
      color:"dark"
    },
    followingAccount: {
      value: false,
      description: 'Hide Following Accounts',
      tooltip: 'Hide Following Accounts',
      order: 3,
      type: 'switch',
      color:"dark"
    },
    navigation: {
      value: false,
      description: 'Hide Navigation',
      tooltip: 'Hides Navigation',
      order: 4,
      type: 'switch',
      color:"dark"
    },
    search: {
      value: false,
      description: 'Hide Search',
      tooltip: 'Hides Search',
      order: 5,
      type: 'switch',
      color:"dark"
    },
    directMessage: {
      value: false,
      description: 'Hide Direct Messages',
      tooltip: 'Hides Direct Messages',
      order: 6,
      type: 'switch',
      color:"dark"
    },
    notifications: {
      value: false,
      description: 'Hide Notifications',
      tooltip: 'Hide Notifications',
      order: 7,
      type: 'switch',
      enabled: false,
      color:"dark"
    },
    account: {
      value: false,
      description: 'Hide Account',
      tooltip: 'Hide Account',
      order: 8,
      type: 'switch',
      enabled: false,
      color:"dark"
    }
  },
  instagramSettings: {
    blockSite: {
      value: false,
      description: 'Block Instagram',
      tooltip: 'Block all access to Instagram domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
      color:"warning"
    },
    feed: {
      value: false,
      description: 'Hide Feed',
      tooltip: 'Hides your news feed',
      order: 1,
      type: 'switch',
      color:"warning"
    },
    suggestedAccount: {
      value: false,
      description: 'Hide Suggested Accounts',
      tooltip: 'Hide Suggested Accounts',
      order: 2,
      type: 'switch',
      color:"warning"
    },
    stories: {
      value: false,
      description: 'Hide Stories',
      tooltip: 'Hide Stories',
      order: 3,
      type: 'switch',
      color:"warning"
    },
    sidebar: {
      value: false,
      description: 'Hide Sidebar',
      tooltip: 'Hides Sidebar',
      order: 4,
      type: 'switch',
      color:"warning"
    },
    account: {
      value: false,
      description: 'Hide Account',
      tooltip: 'Hides Account',
      order: 5,
      type: 'switch',
      color:"warning"
    },
    more: {
      value: false,
      description: 'Hide More',
      tooltip: 'Hides more',
      order: 6,
      type: 'switch',
      color:"warning"
    }
  },
  twitterSettings: {
    blockSite: {
      value: false,
      description: 'Block Twitter',
      tooltip: 'Block all access to Twitter domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
      color:"primary"

    },
    timeline: {
      value: false,
      description: 'Hide Timeline',
      tooltip: 'Hides homepage feed',
      order: 1,
      type: 'switch',
      color:"primary"

    },
    trends: {
      value: false,
      description: 'Hide Trends',
      tooltip: 'Hides Trends section from your feed',
      order: 2,
      type: 'switch',
      color:"primary"

    },
    whoToFollow: {
      value: false,
      description: 'Hide Who to follow',
      tooltip: 'Hides Who to follow section',
      order: 3,
      type: 'switch',
      color:"primary"

    },
    topics: {
      value: false,
      description: 'Hide Topics to follow',
      tooltip: 'Hides Topics to follow section',
      order: 4,
      type: 'switch',
      color:"primary"

    },
    media: {
      value: false,
      description: 'Hide all media',
      tooltip: 'Hides all Videos and Images from your feed',
      order: 5,
      type: 'switch',
      color:"primary"

    },
    color: {
      value: false,
      description: 'Remove colors',
      tooltip: 'Turns everything grey',
      order: 6,
      type: 'switch',
      enabled: false, // Performance Issues
      color:"primary"

    },
  },
  redditSettings: {
    blockSite: {
      value: false,
      description: 'Block Reddit',
      tooltip: 'Block all access to Reddit domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
      color:"danger"

    },
    hideComments: {
      value: false,
      description: 'Hide comments (old.reddit only)',
      tooltip: 'Hides comments and discussion threads from all posts',
      order: 1,
      type: 'switch',
      color:"danger"

      // enabled: false
    },
    hideFrontPageFeed: {
      value: false,
      description: 'Hide Front page feed (old.reddit only)',
      tooltip: 'Hides posts from your reddit front page',
      order: 2,
      type: 'switch',
      color:"danger"

      // enabled: false
    },
    popular: {
      value: false,
      description: 'Block r/popular',
      tooltip: 'Blocks access to r/popular page and hides shortcuts to it',
      type: 'switch',
      order: 3,
      color:"danger"

    },
    all: {
      value: false,
      description: 'Block r/all',
      tooltip: 'Blocks access to r/all page and hides shortcuts to it',
      type: 'switch',
      order: 4,
      color:"danger"

    },
  },
  netflixSettings: {
    blockSite: {
      value: false,
      description: 'Block Netflix',
      tooltip: 'Block all access to Netflix domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
      color:"danger"

    },
    hideAllShowMyAndContinue: {
      value: false,
      description: 'Hide Recommendations',
      tooltip: 'Hides everything except "Continue Watching" and "My List"',
      order: 1,
      type: 'switch',
      color:"danger"

    },
    hideContinueWatching: {
      value: false,
      description: 'Hide Continue Watching',
      tooltip: 'Hides "Continue Watching" queue section',
      type: 'switch',
      order: 2,
      color:"danger"

    },
    hideMyList: {
      value: false,
      description: 'Hide My List',
      tooltip: 'Hides "My List" section',
      type: 'switch',
      order: 3,
      color:"danger"

    },
  },
  generalSettings: {
    disableFilters: {
      value: false,
      description: 'Pause all filters',
      tooltip:
        'Disables all filters temporarily. Your filter settings will remain intact',
      type: 'switch',
      order: 1,
      color:"primary"
    },
    disableFiltersTemporary: {
      value: { active: false, endTimestamp: '' },
      description: 'Pause for 5 minutes',
      tooltip:
        'Pauses all filters for 5 minutes and then resumes automatically',
      type: 'switch-with-meta',
      order: 2,
      color:"primary"

    },
    disableDuringHours: {
      value: { active: false, fromTime: '', toTime: '' },
      description: 'Pause during',
      tooltip: '',
      type: 'switch-with-time-period',
      order: 3,
      color:"primary"

    },
    customSitesToBlock: {
      value: { active: false, customURLList: [] },
      description: 'Block list',
      tooltip: '',
      type: 'text-list',
      order: 4,
      color:"primary"

    },
    customRedirectURL: {
      value: 'www.google.com',
      description: 'Custom URL',
      tooltip:
        'Enter link to a site where you wants to be redirected to if blocked',
      type: 'text',
      order: 5,
      color:"primary"

    },
    hideTooltip: {
      value: false,
      description: 'Hide tooltips',
      tooltip: 'Hide all tooltips shown while hovering on filters',
      type: 'switch',
      order: 6,
      color:"primary"

    }
  },
};

function setLaunchPages(reason, previousVersion = '') {
  // chrome.runtime.setUninstallURL('https://undistracted.typeform.com/to/yx84Z6');
  // if (reason === 'install') {
  //   chrome.tabs.create({ url: 'https://www.undistracted.app/installed' });
  // } else if (reason === 'update') {
  //   if (chrome.runtime.getManifest().version === '1.6') {
  //     chrome.tabs.create({ url: 'https://www.undistracted.app/updated' });
  //   }
  // }
}

function loadStorageToLocal(cbOnLoad) {
  chrome.storage.sync.get(
    [
      'youtubeSettings',
      'facebookSettings',
      'instagramSettings',
      'tiktokSettings',
      'redditSettings',
      'twitterSettings',
      'netflixSettings',
      'generalSettings'
    ],
    (storageData) => {
      if (storageData.twitterSettings) {
        Object.keys(storageData.twitterSettings).forEach((filterKey) => {
          allSettings.twitterSettings[filterKey].value =
            storageData.twitterSettings[filterKey].value;
        });
      }
      if (storageData.youtubeSettings) {
        Object.keys(storageData.youtubeSettings).forEach((filterKey) => {
          allSettings.youtubeSettings[filterKey].value =
            storageData.youtubeSettings[filterKey].value;
        });
      }
      if (storageData.facebookSettings) {
        Object.keys(storageData.facebookSettings).forEach((filterKey) => {
          allSettings.facebookSettings[filterKey].value =
            storageData.facebookSettings[filterKey].value;
        });
      }
      if (storageData.redditSettings) {
        Object.keys(storageData.redditSettings).forEach((filterKey) => {
          allSettings.redditSettings[filterKey].value =
            storageData.redditSettings[filterKey].value;
        });
      }
      if (storageData.netflixSettings) {
        Object.keys(storageData.netflixSettings).forEach((filterKey) => {
          allSettings.netflixSettings[filterKey].value =
            storageData.netflixSettings[filterKey].value;
        });
      }
      if (storageData.tiktokSettings) {
        Object.keys(storageData.tiktokSettings).forEach((filterKey) => {
          allSettings.tiktokSettings[filterKey].value =
            storageData.tiktokSettings[filterKey].value;
        });
      }
      if (storageData.instagramSettings) {
        Object.keys(storageData.instagramSettings).forEach((filterKey) => {
          allSettings.instagramSettings[filterKey].value =
            storageData.instagramSettings[filterKey].value;
        });
      }
      if (storageData.generalSettings) {
        Object.keys(storageData.generalSettings).forEach((filterKey) => {
          if (
            filterKey === 'customSitesToBlock' &&
            Array.isArray(allSettings.generalSettings.customSitesToBlock.value)
          ) {
            allSettings.generalSettings.customSitesToBlock.value = {
              active: false,
              customURLList: [],
            };
          } else {
            allSettings.generalSettings[filterKey].value =
              storageData.generalSettings[filterKey].value;
          }
        });
      }
      cbOnLoad && cbOnLoad();
    }
  );
}

function rootDomain(url) {
  return url
    .match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gim)[0]
    .split('://')
    .reverse()[0]
    .split('www.')
    .reverse()[0];
}

function safeRedirectOnBlock(tabId, redirectUrl, fallbackUrl, safeCheckUrls) {
  const redirectUrlRootDomain = rootDomain(redirectUrl);
  const safeRedirectUrl = safeCheckUrls.some((i) =>
    redirectUrlRootDomain.includes(i)
  )
    ? fallbackUrl
    : redirectUrl;
  chrome.tabs.update(
    tabId,
    {
      url: safeRedirectUrl,
    },
    () => {
      return;
    }
  );
}

function startTimer() {
  const {
    active,
    endTimestamp,
  } = allSettings.generalSettings.disableFiltersTemporary.value;
  const remainingTime = endTimestamp - Date.now();
  if (!active || remainingTime <= 0) {
    return endTimer();
  }
  if (remainingTime > 0) {
    myTimer = setTimeout(endTimer, remainingTime);
  }
}
function endTimer() {
  allSettings.generalSettings.disableFiltersTemporary.value.endTimestamp = '';
  allSettings.generalSettings.disableFiltersTemporary.value.active = false;
  chrome.storage.sync.set(
    {
      generalSettings: allSettings.generalSettings,
    },
    clearTimeout(myTimer)
  );
}

loadStorageToLocal(startTimer);

/* Set storage as empty on installing */
chrome.runtime.onInstalled.addListener((details) => {
  /* Launch welcome / install  */
  setLaunchPages(details && details.reason, details && details.previousVersion);

  // TODO One time - change true/false to show/blur/hide
  (() => {
    var updatedYoutubeSettings = allSettings.youtubeSettings;
    if (allSettings.youtubeSettings.thumbnail.value == false) {
      updatedYoutubeSettings.thumbnail.value = '0';
    } else if (allSettings.youtubeSettings.thumbnail.value == true) {
      updatedYoutubeSettings.thumbnail.value = '1';
    } else {
      updatedYoutubeSettings.thumbnail.value =
        allSettings.youtubeSettings.value;
    }
    chrome.storage.sync.set({
      youtubeSettings: updatedYoutubeSettings,
    });
  })();

  /* Get data from local if already there on updates */
  loadStorageToLocal(() => {
    chrome.storage.sync.set({
      twitterSettings: allSettings.twitterSettings,
      youtubeSettings: allSettings.youtubeSettings,
      facebookSettings: allSettings.facebookSettings,
      redditSettings: allSettings.redditSettings,
      netflixSettings: allSettings.netflixSettings,
      tiktokSettings: allSettings.tiktokSettings,
      instagramSettings: allSettings.instagramSettings,
      generalSettings: allSettings.generalSettings,
    });
  });
});

/* Load settings in script on chrome start */
chrome.runtime.onStartup.addListener(() => {
  loadStorageToLocal();
});

/* Listen to changes in settings and transmit to all open tabs for live update */
chrome.storage.onChanged.addListener(async(changes, namespace) => {
  const [filterCategory, bothChanges] = Object.entries(changes)[0];
  const newSettings = bothChanges.newValue;
  const oldTimerActive =
    allSettings.generalSettings.disableFiltersTemporary.value.active;
  allSettings[filterCategory] = newSettings;

  // Handle disableFiltersTemporary toggle
  if (
    filterCategory === 'generalSettings' &&
    newSettings.disableFiltersTemporary.value.active !== oldTimerActive
  ) {
    if (allSettings.generalSettings.disableFiltersTemporary.value.active) {
      startTimer();
    } else {
      endTimer();
    }
  }
  var tabs = await chrome.tabs.query({});
  await tabs.forEach(async function (tab) {
    try
    {
      await chrome.tabs.sendMessage(tab.id, 'refresh');
    }
    catch(e){
    }
  });
});

// Blocking custom websites
chrome.webNavigation.onBeforeNavigate.addListener(({ frameId, tabId, url }) => {
  if (frameId === 0) {
    const {
      twitterSettings,
      youtubeSettings,
      facebookSettings,
      redditSettings,
      netflixSettings,
      tiktokSettings,
      instagramSettings,
      generalSettings,
    } = allSettings;
    const urlDomain = rootDomain(url);
    const redirectUrl =
      'https://' +
      generalSettings.customRedirectURL.value
        .trim()
        .split('://')
        .reverse()[0];
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
    const fromTime = generalSettings.disableDuringHours.value.fromTime;
    const toTime = generalSettings.disableDuringHours.value.toTime;

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

    if (
      facebookSettings.blockSite.value &&
      relatedDomains.facebook.some((i) => urlDomain.includes(i))
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.facebook
      );
    } else if (
      youtubeSettings.blockSite.value &&
      relatedDomains.youtube.some((i) => urlDomain.includes(i)) &&
      !url.includes('music.') &&
      !url.includes('studio.')
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.youtube
      );
    } else if (
      youtubeSettings.redirectToSubscriptions.value &&
      relatedDomains.youtube.some((i) => urlDomain.includes(i)) &&
      url.split('.com')[1] == '/' &&
      !url.includes('music.') &&
      !url.includes('studio.')
    ) {
      safeRedirectOnBlock(
        tabId,
        'https://www.youtube.com/feed/subscriptions',
        fallbackUrl,
        ['https://www.youtube.com/feed/subscriptions']
      );
    } else if (
      tiktokSettings.blockSite.value &&
      relatedDomains.tiktok.some((i) => urlDomain.includes(i)) &&
      !url.includes('music.') &&
      !url.includes('studio.')
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.tiktok
      );
    } else if (
      instagramSettings.blockSite.value &&
      relatedDomains.instagram.some((i) => urlDomain.includes(i)) &&
      !url.includes('music.') &&
      !url.includes('studio.')
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.instagram
      );
    } else if (
      twitterSettings.blockSite.value &&
      relatedDomains.twitter.some((i) => urlDomain.includes(i))
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.twitter
      );
    } else if (
      redditSettings.blockSite.value &&
      relatedDomains.reddit.some((i) => urlDomain.includes(i))
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.reddit
      );
    } else if (
      netflixSettings.blockSite.value &&
      relatedDomains.netflix.some((i) => urlDomain.includes(i))
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.netflix
      );
    } else if (generalSettings.customSitesToBlock.value.active) {
      const customURLListDomains = generalSettings.customSitesToBlock.value.customURLList.map(
        (customURL) => rootDomain(customURL)
      );
      if (customURLListDomains.some((i) => urlDomain.includes(i))) {
        safeRedirectOnBlock(
          tabId,
          redirectUrl,
          fallbackUrl,
          customURLListDomains
        );
      }
    }
    //  reddit all and popular
    else if (
      redditSettings.all.value &&
      relatedDomains.reddit.some((i) => urlDomain.includes(i)) &&
      url.includes('r/all')
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.reddit
      );
    } else if (
      redditSettings.popular.value &&
      relatedDomains.reddit.some((i) => urlDomain.includes(i)) &&
      url.includes('r/popular')
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.reddit
      );
    }
    // facebook marketplace
    else if (
      facebookSettings.marketplace.value &&
      url.includes('facebook.com/marketplace')
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.reddit
      );
    }
  }
});
