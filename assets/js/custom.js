import {relatedDomains} from "./script.js";
const state = {
    twitterSettings: {},
    youtubeSettings: {},
    facebookSettings: {},
	tiktokSettings:{},
	instagramSettings:{},
    redditSettings: {},
    netflixSettings: {},
    linkedinSettings: {},
    generalSettings: {},
    tabOrder: [1, 2, 3, 4, 5, 6, 7],
};
$(document).ready(function() {
	if (chrome.storage) {
		chrome.storage.sync.get(
		  [
			'twitterSettings',
			'youtubeSettings',
			'facebookSettings',
			'instagramSettings',
			'tiktokSettings',
			'redditSettings',
			'netflixSettings',
			'generalSettings'
		  ],
		  ({
			twitterSettings = {},
			youtubeSettings = {},
			facebookSettings = {},
			redditSettings = {},
			netflixSettings = {},
			generalSettings = {},
			tiktokSettings = {},
			instagramSettings ={}
		  }) => {
			state.facebookSettings = facebookSettings;
			SetToggleElement("#ulfacebook","facebookSettings", state.facebookSettings);
			state.youtubeSettings = youtubeSettings;
			SetToggleElement("#ulyoutube", "youtubeSettings",state.youtubeSettings );
			state.tiktokSettings = tiktokSettings;
			SetToggleElement("#ultiktok", "tiktokSettings",state.tiktokSettings );
			state.instagramSettings = instagramSettings;
			SetToggleElement("#ulinstagram", "instagramSettings",state.instagramSettings );
			state.twitterSettings = twitterSettings;
			SetToggleElement("#ultwitter", "twitterSettings",state.twitterSettings );
			state.redditSettings = redditSettings;
			SetToggleElement("#ulreddit", "redditSettings",state.redditSettings );
			state.netflixSettings = netflixSettings;
			SetToggleElement("#ulnetflix", "netflixSettings",state.netflixSettings );
			state.generalSettings = generalSettings;
			SetToggleElement("#ulsetting", "generalSettings",state.generalSettings );

			$("#ssa_tab").tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
			$("#ssa_tab li").removeClass('ui-corner-top').addClass('ui-corner-left');
			
			chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
				const urlDomain = rootDomain(tabs[0].url);
				if(relatedDomains.youtube.some((i) => urlDomain.includes(i))){
					activeTab('youtube');
			   	} else if(relatedDomains.facebook.some((i) => urlDomain.includes(i))){
					activeTab('facebook');
			    } else if(relatedDomains.instagram.some((i) => urlDomain.includes(i))){
					activeTab('instagram');
				} else if(relatedDomains.tiktok.some((i) => urlDomain.includes(i))){
					activeTab('tiktok');
				} else if(relatedDomains.reddit.some((i) => urlDomain.includes(i))){
					activeTab('reddit');
				} else if(relatedDomains.twitter.some((i) => urlDomain.includes(i))){
					activeTab('twitter');
				} else if(relatedDomains.netflix.some((i) => urlDomain.includes(i))){
					activeTab('netflix');
				}
			});
		  }
		);
	} 
	// Update local generalSettings value on timer completion
	chrome.storage.onChanged.addListener((changes, namespace) => {
        const [filterCategory, bothChanges] = Object.entries(changes)[0];
        const newSettings = bothChanges.newValue;
        const oldSettings = bothChanges.oldValue;
        if (
          filterCategory === 'generalSettings' &&
          newSettings.disableFiltersTemporary.value.active !==
            oldSettings.disableFiltersTemporary.value.active
        ) {
		  setState(generalSettings,newSettings);
        }
    });
});
function rootDomain(url) {
	return url
	  .match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gim)[0]
	  .split('://')
	  .reverse()[0]
	  .split('www.')
	  .reverse()[0];
}
function activeTab (tab){
	$('.nav.nav-tabs a[href="#' + tab + '"]').click();
};
function setState(generalSettings,newSettings,callback){
	state[generalSettings]= newSettings;
	if(callback){
		callback();
	}
}
function SetToggleElement(keyElem,filterCategory, settingsEle){
	if(settingsEle){
		var elehtml = "";
		Object.keys(settingsEle).sort((a,b)=>{
			return settingsEle[a].order-settingsEle[b].order}
		).forEach((filterKey) => {
			if(settingsEle[filterKey].enabled == undefined || settingsEle[filterKey].enabled === true){
				if(settingsEle[filterKey].type==="switch"){
					elehtml +=`
					<li class="ant-list-item filterListItem ` + settingsEle[filterKey].customClass+`">
						<div class="filterDescription">`+settingsEle[filterKey].description+`</div>
						<input type="checkbox" class id="`+filterKey+`" `+ (settingsEle[filterKey].value?"checked":"") +` 
							data-onstyle="`+ settingsEle[filterKey].color +`" data-toggle="toggle" data-size="sm">
					</li>`
				}
				else if(settingsEle[filterKey].type==="switch-multi"){
					elehtml +=`
					<li class="ant-list-item filterListItem ` + settingsEle[filterKey].customClass+`">
						<div class="filterDescription">`+settingsEle[filterKey].description+`</div>
						<div class="btn-group btn-group-toggle" data-toggle="buttons">
							<label class="shadow-none btn btn-outline-`+ settingsEle[filterKey].color +` btn-sm `+(settingsEle[filterKey].value==="0"?"active":"")+`">
								<input type="radio" name="`+filterKey+`" id="`+filterKey+`0"  autocomplete="off"> Show
							</label>
							<label class="shadow-none btn btn-outline-`+ settingsEle[filterKey].color +` btn-sm `+(settingsEle[filterKey].value==="1"?"active":"")+`">
								<input type="radio" name="`+filterKey+`" id="`+filterKey+`1"  autocomplete="off"> Blur
							</label>
							<label class="shadow-none btn btn-outline-`+ settingsEle[filterKey].color +` btn-sm `+(settingsEle[filterKey].value==="2"?"active":"")+`">
								<input type="radio" name="`+filterKey+`" id="`+filterKey+`2" autocomplete="off"> Hide
							</label>
						</div>
					</li>`
				}
			}
		});
		$(keyElem).prepend(elehtml)
		Object.keys(settingsEle).forEach((filterKey) => {
			if(settingsEle[filterKey].enabled == undefined || settingsEle[filterKey].enabled === true){
				if(settingsEle[filterKey].type==="switch"){
					$(keyElem +" #"+filterKey).bootstrapToggle();
					$(keyElem +" #"+filterKey).change(function() {
						var filterValue =  $(this).prop('checked');
						if (filterCategory === 'generalSettings' && filterKey === 'disableFilters') {
							if (checked) {
							  chrome.browserAction.setBadgeBackgroundColor({ color: '#FF0000' });
							  chrome.browserAction.setTitle({
								title: 'Paused. Resume under *General Settings > Pause all filters*',
							  });
							  chrome.browserAction.setBadgeText({ text: '!' });
							} else {
							  chrome.browserAction.setTitle({
								title: 'UnDistracted',
							  });
							  chrome.browserAction.setBadgeText({ text: '' });
							}
						  } else if (
							filterCategory === 'generalSettings' &&
							filterKey === 'disableFiltersTemporary'
						  ) {
							filterValue = {
							  active: filterValue,
							  endTimestamp: filterValue ? Date.now() + pauseTime : '', // add 5 minutes for timer
							};
						  } else if (
							filterCategory === 'generalSettings' &&
							filterKey === 'disableDuringHours'
						  ) {
							filterValue = {
							  active: filterValue.active,
							  fromTime: filterValue.fromTime,
							  toTime: filterValue.toTime,
							};
						  }
						updateFilterValue(filterCategory, filterKey, filterValue);
					})
				}
				else if(settingsEle[filterKey].type==="switch-multi"){
					$(keyElem +" input[name='"+filterKey+"']").on("click",function(){
						var filterValue =  $(this).prop('id').trim().slice(-1);
						updateFilterValue(filterCategory, filterKey, filterValue);
					});
				}
			}
		});
	}
}
function updateFilterValue(filterCategory, filterKey, filterValue){
	const tempSettings = state[filterCategory];
    tempSettings[filterKey].value = filterValue;
    setState(filterCategory,tempSettings, () => {
      if (chrome.storage) {
        chrome.storage.sync.set({
          [filterCategory]: state[filterCategory],
        });
      }
    });
}