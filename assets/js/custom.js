import {relatedDomains,isValidHttpUrl} from "./script.js";
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
const pauseTime = 5 * 60 * 1000;

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
			if(state.generalSettings.disableFilters.value){
				$("#ssa_tab").addClass("disabled-filters");
			}
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
		  setState(filterCategory,newSettings);
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
				else if(settingsEle[filterKey].type==="switch-with-meta"){
					elehtml +=`
					<li class="ant-list-item filterListItem ` + settingsEle[filterKey].customClass+`">
						<div class="filterDescription">`+settingsEle[filterKey].description+`</div>
						<input type="checkbox" class id="`+filterKey+`" `+ (settingsEle[filterKey].value.active?"checked":"") +` 
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
				else if(settingsEle[filterKey].type==="switch-with-time-period"){
					elehtml +=`
					<li class="ant-list-item filterListItem">
						<div class="filterDescription">`+settingsEle[filterKey].description+`</div>
						<div class="time-list-controls">
							<div class="input-group timePickers" id="fromTime" data-target-input="nearest">
								<input type="text" id="date" name="reminder_time" class="form-control datetimepicker-input" data-toggle="datetimepicker" data-target="#fromTime"/>
								<div class="input-group-append" data-target="#fromTime" data-toggle="datetimepicker">
								</div>
							</div>
							<span class="ant-tag">to</span>
							<div class="input-group timePickers" id="toTime" data-target-input="nearest">
								<input type="text" id="date" name="reminder_time" class="form-control datetimepicker-input" data-toggle="datetimepicker" data-target="#toTime"/>
								<div class="input-group-append" data-target="#toTime" data-toggle="datetimepicker">
								</div>
							</div>
							<input type="checkbox" class id="`+filterKey+`" `+ (settingsEle[filterKey].value.active?"checked":"") +` 
							data-onstyle="`+ settingsEle[filterKey].color +`" data-toggle="toggle" data-size="sm">
						</div>
					</li>`
				}
				else if(settingsEle[filterKey].type==="text-list"){
					elehtml +=`
					<li class="ant-list-item filterListItem">
						<div class="filterDescription">`+settingsEle[filterKey].description+`</div>
						<div class="text-list-controls">
							<div>
								<button id="customURLList" type="button" class="btn btn-sm btn-outline-success">
									<i class="fa-solid fa-pen"></i>
									<span>Domains to block</span>
								</button>
							</div>
							<input type="checkbox" class id="`+filterKey+`" `+ (settingsEle[filterKey].value.active?"checked":"") +` 
							data-onstyle="`+ settingsEle[filterKey].color +`" data-toggle="toggle" data-size="sm">
						</div>
					</li>`;
					settingsEle[filterKey].value.customURLList.forEach((val)=>{
						$(".url-tags").prepend(`<p class="btn-outline-rounded saved_tags" data-reply="`+val+`">`+val+`
								<button class="btn btn-sm remove_tag" style="padding:0px 4px;">
									<small style="padding: 2px">x</small>
								</button>`);
					})
				}
				else if(settingsEle[filterKey].type==="text"){
					elehtml +=`
					<li class="ant-list-item filterListItem">
						<div class="filterDescription">`+settingsEle[filterKey].description+`</div>
						<div class="btn-toolbar mb-3" role="toolbar">
							<div class="input-group input-group-sm">
								<div class="input-group-prepend">
									<div class="input-group-text input-sm input-control" id="btnGroupAddon">https://</div>
								</div>
								<input id="`+filterKey+`" type="text" class="form-control input-sm h-100" aria-describedby="btnGroupAddon" value="`+settingsEle[filterKey].value+`">
							</div>
						</div>
					</li>`
				}
			}
		});
		$(keyElem).prepend(elehtml)
		Object.keys(settingsEle).forEach((filterKey) => {
			if(settingsEle[filterKey].enabled == undefined || settingsEle[filterKey].enabled === true){
				if(settingsEle[filterKey].type==="switch" || settingsEle[filterKey].type==="switch-with-meta"
				|| settingsEle[filterKey].type==="switch-with-time-period"
				|| settingsEle[filterKey].type==="text-list"){
					$(keyElem +" #"+filterKey).bootstrapToggle();
					$(keyElem +" #"+filterKey).change(function() {
						var filterValue =  $(this).prop('checked');
						if (filterCategory === 'generalSettings' && filterKey === 'disableFilters') {
							if (filterValue) {
							  chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
							  chrome.action.setTitle({
								title: 'Paused. Resume under *Settings > Pause all filters*',
							  });
							  chrome.action.setBadgeText({ text: '!' });
							  $("#ssa_tab").addClass("disabled-filters");
							} else {
							  chrome.action.setTitle({
								title: 'UnDi$tracted',
							  });
							  chrome.action.setBadgeText({ text: '' });
							  $("#ssa_tab").removeClass("disabled-filters");
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
							  active: filterValue,
							  fromTime: state[filterCategory][filterKey].value.fromTime,
							  toTime: state[filterCategory][filterKey].value.toTime,
							};
						  } else if (
							filterCategory === 'generalSettings' &&
							filterKey === 'customSitesToBlock'
						  ) {
							
							filterValue = {
							  active: filterValue,
							  customURLList: state[filterCategory][filterKey].value.customURLList

							};
						  }
						updateFilterValue(filterCategory, filterKey, filterValue);
					})
					if(settingsEle[filterKey].type==="switch-with-time-period"){
						$(keyElem +" #fromTime").datetimepicker({
							format: 'hh:mm a'
						});
						$(keyElem +" #toTime").datetimepicker({
							format: 'hh:mm a'
						});
					}
					if (filterCategory === 'generalSettings' && filterKey === 'customSitesToBlock') {
						$(keyElem +" #customURLList").on("click",function(){
							$("#customURLListModal").modal();
						})
						
						// Fetch all the forms we want to apply custom Bootstrap validation styles to
						var forms = document.querySelectorAll('.needs-validation')

						// Loop over them and prevent submission
						Array.prototype.slice.call(forms)
							.forEach(function (form) {
							$("#inputCustomURL").on("change", () => {
								if(isValidHttpUrl($("#inputCustomURL").val())){
									$("#inputCustomURL").addClass("is-valid");
									$("#inputCustomURL").removeClass("is-invalid");
									$("#addCustomURL").prop('disabled', false);
								}
								else{
									$("#inputCustomURL").removeClass("is-valid");
									$("#inputCustomURL").addClass("is-invalid");
									$("#addCustomURL").prop('disabled', true);
								}
							});
							form.addEventListener('submit', function (event) {
								event.preventDefault();
								event.stopPropagation();

								$(".url-tags").prepend(`<p class="btn-outline-rounded saved_tags" data-reply="`+$("#inputCustomURL").val()+`">`+$("#inputCustomURL").val()+`
								<button class="btn btn-sm remove_tag" style="padding:0px 4px;">
									<small style="padding: 2px">x</small>
								</button>
							</p>`);
								toastr["success"]( $("#inputCustomURL").val() +" added");
								var array = [];
								$('.saved_tags').each(function () {
									array.push($(this).attr("data-reply") );
								});
								let filterValue = {
									active: state[filterCategory][filterKey].value.active,
									customURLList: array
	  
								};
								updateFilterValue(filterCategory, filterKey, filterValue);
								$("#inputCustomURL").val("");
								$("#inputCustomURL").removeClass("is-valid");
							}, false)
							})
							$(document).on('click', '.remove_tag', function (e) {
								let reply = $(this).closest('p');
								reply.remove();
								var array = [];
								$('.saved_tags').each(function () {
									array.push($(this).attr("data-reply") );
								});
								let filterValue = {
									active: state[filterCategory][filterKey].value.active,
									customURLList: array
	  
								};
								updateFilterValue(filterCategory, filterKey, filterValue);
								toastr["success"]($(reply).attr("data-reply") +" removed");
							});
					}

					
				}
				else if(settingsEle[filterKey].type==="switch-multi"){
					$(keyElem +" input[name='"+filterKey+"']").on("click",function(){
						var filterValue =  $(this).prop('id').trim().slice(-1);
						updateFilterValue(filterCategory, filterKey, filterValue);
					});
				}
				else if(settingsEle[filterKey].type==="text"){
					if (filterCategory === 'generalSettings' && filterKey === 'customRedirectURL') {
						$(keyElem +" #"+filterKey).on("input",function(){
							if(isValidHttpUrl($(this).val() || $(this).val().trim()==="")){
								$(this).addClass("is-valid");
								$(this).removeClass("is-invalid");
							}
							else{
								$(this).removeClass("is-valid");
								$(this).addClass("is-invalid");
							}
						})
						$(keyElem +" #"+filterKey).on("blur",function(){
							if($(this).hasClass("is-valid")){
								updateFilterValue(filterCategory, filterKey, $(this).val());
							}
						})
					}
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