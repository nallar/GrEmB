// ==UserScript==
// @name		GrEmB - Global r/mylittlepony Emote Bundle
// @version		1.97
// @namespace		http://nallar.me
// @run-at		document-start
// @description		Reddit emote display script.
// @license		SpoutDev License - https://raw.github.com/SpoutDev/Spout/2f8cc539abaef/LICENSE.txt - Code marked as ArbitraryEntity's is exluded from this, you must get permission from AE to include it in a fork/modification/etc.
// @author		nallar,ArbitraryEntity
// @credits		Super Reddit Alt-Text display by ArbritaryEntity is included in this script. Emote Manager was inspired by RogueDarkJedi's Easy Emotes and My Global Ponies,duh! Color scheme used for user familiarity reasons, you can set your own in the config.)
// @homepage	http://nallar.me/scripts
// @include		http://*/*
// @_include	https://*/*
//LIST('//@exclude\t',exclude.list,'\n')
// @exclude		http://www.redditmedia.com/*
// @exclude		http://pagead2.googlesyndication.com/*
// @exclude		http://*google.com/reviews/widgets*
// @exclude		http://www.blogger.com/navbar.*
// @exclude		http://googleads.g.doubleclick.net/*
// @exclude		http://badge.stumbleupon.com/*
// @exclude		http://*facebook.com/extern/*
// @exclude		http://*connect.facebook.com/*
// @exclude		http://nwidget.networkedblogs.com/*
// @exclude		http://static.ak.fbcdn.net/connect/*
// @exclude		http://*facebook.com/dialog/oauth*
// @exclude		http://showadsak.pubmatic.com/*
// @updateURL	http://nallar.me/scripts/GrEmB.user.js
// ==/UserScript==

var localVersion = 1.97;

//If there's another(reasonable :P) license you think this should be released under, just ask!

//Report bugs at the 'Send me a message!' link at the homepage.
if(document.mozSyntheticDocument){
	return;
}

var doNotUse = '', ranPassFunction = false, mainStylesheet = "http://nallar.me/css/main.min.css", otherStylesheet = "http://nallar.me/css/other.min.css", nsfwStylesheet = "http://nallar.me/css/main_nsfw.min.css";
var wkMutation = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
if(location.protocol === "https:"){
	mainStylesheet = "https://nallar.me/scripts/out4.min.css";
	otherStylesheet = "https://nallar.me/scripts/other.min.css";
	nsfwStylesheet = "https://nallar.me/scripts/nsfw.min.css";
}
var confStore = undefined;
var inFrame = (window.top != window);

if(inFrame&&(window.innerWidth < 200 ||  window.innerHeight < 200)){
	ranPassFunction = true;
}

function passFunction(){
		if(ranPassFunction||document.getElementById("noGlobalPonymotes")){
			return (ranPassFunction = true&&false);
		}
		ranPassFunction = true;
		
		
		
		//START STATIC VARS
		var subs = ["mylittlesh", "mlas1party", "mylittleanhero23", "cuttershy", "gremotes", "pankakke", "mylittlesports", "molestia", "flitter", "ilovedashie", "applebloom", "seriouslyluna", "mylittlefoodmanes", "gallopfrey", "mylittleanime", "mylittleaprilfools", "dashiemotes", "lyra", "tbpimagedump", "mylittlealcoholic", "mlplounge", "mylittleserver", "minuette", "twilightsparkle", "mylittlewarhammer", "ainbowdash", "mylittledamon", "mylittlekindle", "octavia", "pinkiepie", "mylittlewtf", "mylittlenanners", "mylittlewelcomewagon", "mylittlenosleep", "mlpdrawingschool", "mylittledaww", "mylittlemusician", "surprise", "mylittlelistentothis", "applejack", "mylittlecelestias", "mylittlefortress", "roseluck", "mlhfis", "falloutequestria", "mylittlelivestream", "mlas1animotes", "daylightemotes", "mylittlesquidward", "vinylscratch", "mylittlenopenopenope", "thebestpony", "mylittleandysonic1", "idliketobeatree", "mylittlebannertest", "mylittlechaos", "mylittlesupportgroup", "speedingturtle", "mylittlecirclejerk", "mylittleonions", "mylittlecombiners", "mylittlepony"];
		
		var debug, sSection, sSSection, endSection, endSSection, unsupported = false, madeSBConf = false, isWebKit = navigator.userAgent.indexOf('WebKit/') != -1, isChrome = navigator.userAgent.indexOf('Chrome/') != -1, isFF = navigator.userAgent.indexOf('Firefox/') != -1, confStore = undefined,	globalConvert = !isReddit, markdownConvert = isReddit, cssPrefix = (isWebKit?'-webkit-':(window.opera?'-o-':'-moz-')), superBundlePrefs,cssStore='',currentForm = false, cssElement = false, windowClasses = "GrEmBWindow GrEmBEmoteWindow", closedWindowClasses = windowClasses + " closedWindow", setUpTabs = false, windowCreators = {},isReddit = (/reddit\.com/i).test(window.location.host)||document.getElementById("redditPonymotes"), timeOutCounter = 60, initRefresh = false, doRefresh = false, emoteNames_, requiredStyles = 0, loadedStyles = 0, doSave = 0, noGlobalTags = {"TEXTAREA":true, "INPUT":true, "CODE":true, "SCRIPT":true}, emoteMatchRegExp = /(?:^|[^\\])\[\]\(\/([_!a-zA-Z0-9\-]{1,60})(?:\s"([^"]+?)"|\s'([^']+)')?\)/, goEmote = true, goExpand = true, stopExp = false, goFind = true, ranInitial = false, wt = 0, cssRun = true, linkRegex = /\b(?:(http(?:s?)\:\/\/)|(?:www\d{0,3}[.])|(?:[a-z0-9.\-]+[.][a-z]{2,4}\/))(?:\S*)\b/i, noExpandEmotes = {'/b':1, '/s':1, '/spoiler':1,}, settingsForm = false, noCloneNames = {'emoteNames':1,'csssstore':1}, oldDis = false, convTimeout = false, tabs = {};
		
		var flagFunctions = {
			'rs_': function(flag,em){
				em.style[cssPrefix+'transform']+=' scaleX('+flag+') scaleY('+flag+')';
			},
			
			'rsx_': function(flag,em){
			
			},
			
			'rsy_': function(flag,em){
			
			},
			
			'or_': function(flag,em){
			
			},
		};
		
		var defaultConfs = {
			'defaultEmoteContainer': true,
			'defaultEmoteContainerSearch': true,
			'defaultEmoteContainerMLAS1': true,
			'defaultEmoteContainerILTBAT': true,
			'defaultEmoteContainerMouseLeave': false,
			'defaultEmoteContainerEverywhere': true,
			'defaultEmoteContainerOnTop': true,
			'searchbarSpike': false,
			'internalUpdateCheck': true,
			'searchbarSpikeEverywhere': false,
			'emoteManagerEverywhere': true,
			'emoteManagerWindowStyleType': true,
			'emoteManagerWindowStyle': 'border: 1px solid #E1B000; background-color: #FFFDCC;',
			'defaultEmoteContainerY': "19",
			'defaultEmoteContainerX': "10",
			'defaultEmoteContainerWidth': "240",
			'defaultEmoteContainerHeight': "375",
			'defaultEmoteContainerSide': false,
			'defaultEmoteContainerGlobal': true,
			'emoteSearchReg': false,
			'otherSubCSS': true,
			'disableEmoteSpin': true,
			'displayUnknownEmotes': true,
			'additionalSubreddits_': '',
			'nsfwDefunctEmotes': false,
			'alwaysTrue': true,
			'csssstore': {},
			'emoteNames': {'sbf':true},
			'oldVersion': false,
			'updateCheckWeekly': !isFF,
			'lastVersion': localVersion,
			'lastUpdate': 0,
			'wideReddit': false,
			'justReset': false,
			'emoteCopy': false,
		};
		//END STATIC VARS
		
		////////////////////////////START FUNCTIONS////////////////////////////
		function trim(str){
			return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		};
		
		
		function G_safeGetValue(){
						return confStore;	
		};
		function getConf(id){//preprocessor macro used instead.
			if(defaultConfs[id] === undefined) {
				debug(103, "confStore[): Hmm... this id isn't in defaultConfs, something is wrong :( " + id];
			}
			var temp;
			temp = G_safeGetValue();
			if(temp[id] === undefined) {
				setConf(id, defaultConfs[id]);
				temp[id] = defaultConfs[id];
			}
			return temp[id];
		};
		
		function getConfForm(id){
			if(confStore[id]!==false){
				return "checked='yes'";
			}
			return "";
		}
		
		function getConfForm2(id){
			if(confStore[id]===false){
				return "checked='yes'";
			}
			return "";
		}
		function cloness(thiss){
			var newObj = (thiss instanceof Array) ? [] : {};
			for(i in thiss) {
				if(typeof thiss[i] === "object") {
					newObj[i] = cloness(thiss[i]);
				} else {
					newObj[i] = thiss[i];
				}
			}
			return newObj;
		}
		function setConf(name, value, nosave){
			confStore[name] = value;
			if(!nosave){
				saveConf();
			}
		};
		
		function saveConf(){
						chrome.extension.sendRequest({method: "setConf",data:temp});	
		}
		
		function removeDefunctConfs(){
			for(var i in confStore){
				if(defaultConfs[i] === undefined){
					delete confStore[i];
				}
			}
			saveConf();
		}
		
		function makeInput(id, type, dis_, q){
			if(defaultConfs[id] === undefined){
				debug(103, "makeInput(): Hmm... this id isn't in defaultConfs, something is wrong :( " + id);
			}
			if(!q){
				var q = '';
			}
			if(type == 'checkbox'){
				return '<span style=\'float: right !important;\'><input id="' + id + '" name="conf" value="' + id + '" type="checkbox" ' + getConfForm(id) + dis_ + '/></span>';
			}
			if(type == 'text'){
				return '<span style=\'float: right !important;\'><input id="' + id + '" style="height: 18px;" name="conf" value="' + getConf(id) + '" type="textarea" ' + dis_ + '"/></span>';
			}
			if(type == 'radio2'){
				return '<span style=\'float: right !important;\'>' + q + '<input id="' + id + '" name="conf" value="right" type="radio" ' + getConfForm2(id) + dis_ + '/></span>';
			}
			if(type == 'radio1'){
				return '<span style=\'float: right !important;\'>' + q + '<input id="' + id + '" name="conf" value="left" type="radio" ' + getConfForm(id) + dis_ + '/></span>';
			}
			debug(104, "Invalid type for makeInput: " + id + "\t" + type + "\t" + dis_);
			return '';
		}

		function nrKeys(a){
			var i = 0;
			for(var key in a){
				i++;
			}
			return i;
		}

		function compareAssociativeArrays(a, b, depth){
			if(a == b){
				return true;
			}
			if(nrKeys(a) != nrKeys(b)){
				return false;
			}
			if(depth == undefined){
				var depth = 0;
			} else if(depth > 3){
				return true; //hopefully they actually are the same... :p
			}
			for(var key in a){
				if(noCloneNames[key]){}
				else if(typeof (a[key]) === "object" && typeof (b[key]) === "object"){
					if(!compareAssociativeArrays(a[key], b[key], depth + 1)){
						return false;
					}
				}else if(a[key] != b[key]){
					return false;
				}
			}
			return true;
		}
		function onChange(){
			var oconf = cloness(confStore),refreshPage = false;
			for(var i in settingsForm.elements){
				i = +i;
				if(isNaN(i)){
					continue;
				}
				if(settingsForm.elements[i].checked !== undefined && settingsForm.elements[i].type === "checkbox"){
					confStore[settingsForm.elements[i].id] = settingsForm.elements[i].checked;
				} else if(settingsForm.elements[i].type.substr(0, 4) === "text"){
					confStore[settingsForm.elements[i].id] = settingsForm.elements[i].value;
				} else if(settingsForm.elements[i].type === "radio"){
					if(settingsForm.elements[i].checked){
						confStore[settingsForm.elements[i].id] = (settingsForm.elements[i].value === "left");
					}
				}
			}
			if(getConf("emoteManagerWindowStyleType")){
				confStore["emoteManagerWindowStyle"] = defaultConfs["emoteManagerWindowStyle"];
			}
			if((confStore['additionalSubreddits_'] != oconf['additionalSubreddits_']) || (confStore['otherSubCSS'] != oconf['otherSubCSS']) || (confStore['nsfwDefunctEmotes'] != oconf['nsfwDefunctEmotes']) || (confStore['displayUnknownEmotes'] != oconf['displayUnknownEmotes'])){
				emoteNames = defaultConfs['emoteNames'];
				confStore['emoteNames'] = emoteNames;
				confStore['csssstore'] = {};
				refreshPage = true;
			}
			if(!compareAssociativeArrays(confStore, oconf)){
				saveConf();
				if(refreshPage){
					window.location.replace('http://nallar.me/scripts/');
				}else{
					makeWindow();
				}
			}
			
		};
		function addListenersAgain(){
			settingsForm.addEventListener("change", onChange);
		};
		function makeWindow(){
			if(unsupported){
				superBundlePrefs.innerHTML = "<span style='text-color: red; text-style: bold;'>For some reason we can't seem to save configuration data - did you remember to install TamperMonkey if you're using Chrome? Make sure you did, remove this script from your extensions, and install it again, making sure to click ok when it asks you if you want to install it with TamperMonkey.</span><br />";
				return;
			}
			var dis = {'all':'','E':'','F':'','G':'','S':'','FF':' disabled=\'disabled\'','WK':' disabled=\'disabled\''};

			if(!getConf("defaultEmoteContainer")){
				dis.E = " disabled='disabled'";
			}
			if(!getConf("emoteManagerEverywhere")){
				dis.G = " disabled='disabled'";
				dis.F = dis.G;
			}
			if(getConf("emoteManagerWindowStyleType")){
				dis.S = " disabled='disabled'";
			}
			if(isFF){
				dis.FF = '';
			}
			if(isWebKit){
				dis.WK = '';
			}
			if(compareAssociativeArrays(oldDis,dis)){
				return;
			}
			oldDis = dis;
			superBundlePrefs.innerHTML = "<h3 style='font-size:110%'>GrEmB Configuration</h3><br /><form action='#' name='settingsForm' id='settingsForm'>" + 'Use script update checker?(set to off if you have GM/TM correctly configured for updating)' + makeInput('internalUpdateCheck', 'checkbox', dis.all) + '<br />&#160;&#160;Check for updates weekly instead of every day?' + makeInput('updateCheckWeekly', 'checkbox', dis.all) + '<br /><br />Include Emote Window?' + makeInput('defaultEmoteContainer', 'checkbox', dis.all) + '<br />&#160;&#160;Display emote window everywhere instead of just reddit?' + makeInput('defaultEmoteContainerEverywhere', 'checkbox', dis.E) + '<br />&#160;&#160;Display emote window above reddit header?' + makeInput('defaultEmoteContainerOnTop', 'checkbox', dis.E) + '<br />&#160;&#160;Close the emote window when your mouse leaves it?' + makeInput('defaultEmoteContainerMouseLeave', 'checkbox', dis.E) + '<br />&#160;&#160;Which side of the screen should the Emote Window be displayed on?' + makeInput('defaultEmoteContainerSide', 'radio2', dis.E, "Right:") + makeInput('defaultEmoteContainerSide', 'radio1', dis.E, "Left:") + '<br />&#160;&#160;Include r/mylittleandysonic1 emotes?' + makeInput('defaultEmoteContainerMLAS1', 'checkbox', dis.E) + '<br />&#160;&#160;Include r/idliketobeatree emotes?' + makeInput('defaultEmoteContainerILTBAT', 'checkbox', dis.E) + '<br />&#160;&#160;Use Easy Emotes style emote window?' + makeInput('emoteManagerWindowStyleType', 'checkbox', dis.E) + (getConf("emoteManagerWindowStyleType")?'':('<br />&#160;&#160;&#160;&#160;What custom CSS style should be used?' + makeInput('emoteManagerWindowStyle', 'text', (dis.E || dis.S)))) + '<br />&#160;&#160;Emote window vertical position in pixels(41 to line up for RES)' + makeInput("defaultEmoteContainerY", "text", dis.E) + '<br />&#160;&#160;Emote window width in pixels(130 is Easy Emotes default size)' + makeInput("defaultEmoteContainerWidth", "text", dis.E) + '<br />&#160;&#160;Emote window height in pixels(250 is Easy Emotes default size)' + makeInput("defaultEmoteContainerHeight", "text", dis.E) + '<br /><br />Wide reddit mode - messages/posts display across the full width' + makeInput('wideReddit', 'checkbox', dis.all) + '<br />Show pony emotes globally?' + makeInput('emoteManagerEverywhere', 'checkbox', dis.all) + '<br />&#160;&#160;Make copy-paste include emote text(FF only)' + makeInput("emoteCopy", "checkbox", dis.FF) + '<br /><br />Make reddit searchbars spike' + makeInput('searchbarSpike', 'checkbox', dis.all) + '<br />&#160;&#160;Try to make all searchbars spike' + makeInput('searchbarSpikeEverywhere', 'checkbox', dis.all) + '<br />&#160;&#160;Include non-mlp subreddits. homestuck,minecraft,f7u12' + makeInput('otherSubCSS', 'checkbox', dis.all) + '<br />&#160;&#160;To add more subreddits, add the names here.<br />&#160;&#160;Separate using commas!eg: sub1,sub2' + makeInput('additionalSubreddits_', 'text', dis.all) + '<br />&#160;&#160;Include <b style="color: red;">NSFW</b> emotes.(You probably don\'t want to)' + makeInput('nsfwDefunctEmotes', 'checkbox', dis.all) + '<br />&#160;&#160;Try to find and replace unknown emotes with a message' + makeInput('displayUnknownEmotes', 'checkbox', dis.all) + '<br /><br /><b>Disable spinning/3D emotes?</b> (recommended unless you have a fast computer)' + makeInput('disableEmoteSpin', 'checkbox', dis.all) + '<br /><input id="saveSubmit" name="conf" type="submit" value="save"' + dis.all + '/>' + "</form>";
			settingsForm = document.getElementById('settingsForm');
			//settingsForm.addEventListener("click", onChange);
			settingsForm.addEventListener("change", onChange);
		}
		
		function addSBConf(){
			if(madeSBConf){
				return;
			}
			superBundlePrefs = document.getElementById("superBundleConfAnchor");
			if(superBundlePrefs){
				document.getElementById("installInstructions").innerHTML = '';
				document.getElementById("updateInstructions").setAttribute('style', '');
				document.getElementById("yourVersion").innerHTML = localVersion;
				var currentVersion = (+(document.getElementById("currentVersion").textContent));
				if(currentVersion <= localVersion){
					document.getElementById('noUpdateAvailable').setAttribute('style', '');
					document.getElementById('updateAvailable').setAttribute('style', 'display: none;');
					if(!((/unstable/i).test("http://nallar.me/scripts/GrEmBunstable.user.js"))){document.getElementById('installclick3').setAttribute('href',"http://nallar.me/scripts/GrEmBunstable.user.js");}
				}else{
					if(!((/unstable/i).test("http://nallar.me/scripts/GrEmBunstable.user.js"))){document.getElementById('installclick2').setAttribute('href',"http://nallar.me/scripts/GrEmBunstable.user.js");}
				}
				var style = ".confPanel br {line-height: 10px;}.confPanel {border: 1px solid #E1B000; background-color: #FFFDCC; top: 60px; position: fixed;} .confPanel {min-height: 10%; max-height: 95%; overflow-y: scroll; width: 48%; height: auto; z-index: 0 !important; left: 10px !important;} #page {width: 48% !important; position: relative !important; float: right;}";
				addCSS(style);
				showCSS();
				superBundlePrefs.setAttribute("id", "superBundleConfPanel");
				superBundlePrefs.setAttribute("class", "confPanel");
				superBundlePrefs.setAttribute("style", "margin-left: 10px !important; margin-right: 10px !important; font-size: small !important; line-height: 20px;");
				makeWindow();
				madeSBConf = true;
			}
		};
		
		function addCSS(rule){
			cssStore += ("\r\n \r\n" + rule + "\r\n \r\n");
		}
		
		function showCSS(){
			if(!cssElement){
				cssElement = document.createElement('style');
				cssElement.type = 'text/css';
				cssElement.appendChild(document.createTextNode(cssStore));
				document.head.appendChild(cssElement);
			}else{
				cssElement.insertBefore(document.createTextNode(cssStore),cssElement.firstChild);
			}
			cssStore = '';
		}

		function setCursor(node, pos){ //Thanks stack overflow! http://stackoverflow.com/questions/1865563/set-cursor-at-a-length-of-14-onfocus-of-a-textbox
			var node = (typeof node == "string" || node instanceof String) ? document.getElementById(node) : node;
			if(!node){
				return false;
			} else if(node.createTextRange){
				var textRange = node.createTextRange();
				textRange.collapse(true);
				textRange.moveEnd(pos);
				textRange.moveStart(pos);
				textRange.select();
				return true;
			} else if(node.setSelectionRange){
				node.setSelectionRange(pos, pos);
				return true;
			}
			return false;
		}

		function getCursorPos(){
			var range = document.selection.createRange();
			var bookmark = range.getBookmark();
			return bookmark.charCodeAt(2) - 11;
		}

		function addEmote(event, id){
			var emoteID, startPos, endPos, formLength, className = event.target.getAttribute("class");
			if(!className||!currentForm){
				return true;
			}
			emoteID = className.match((/^G_(.+?)_(?: G_small)?$/))[1];
			
			if(!emoteID){
				return true;
			}
			event.stopPropagation();
			event.preventDefault();
			emoteID = emoteID + (event.ctrlKey ? '-inp':'') + (event.altKey ? '-r': '') + (event.shiftKey ? '-d': '');
			
			
			if(currentForm.value !== undefined){
				startPos = currentForm.selectionStart;
				endPos = currentForm.selectionEnd;
				formLength = currentForm.value.length;

				if(startPos != endPos){
					currentForm.value = currentForm.value.substring(0, startPos) + "[](/" + emoteID + " \"" + currentForm.value.substring(startPos, endPos) + "\")" + currentForm.value.substring(endPos);
				} else {
					currentForm.value = currentForm.value.substring(0, startPos) + "[](/" + emoteID + ")" + currentForm.value.substring(startPos);
				}
				currentForm.setSelectionRange(endPos + (currentForm.value.length - formLength), endPos + (currentForm.value.length - formLength));
			} else if(currentForm.innerText !== undefined){
				if(window.getSelection){
					startPos = window.getSelection().anchorOffset;
					endPos = window.getSelection().focusOffset;
				} else {
					startPos = getCursorPos();
					endPos = startPos;
				}
				formLength = currentForm.innerText.length;

				if(startPos != endPos){
					currentForm.innerText = currentForm.innerText.substring(0, startPos) + "[](/" + emoteID + " \"" + currentForm.innerText.substring(startPos, endPos) + "\")" + currentForm.innerText.substring(endPos);
				} else {
					currentForm.innerText = currentForm.innerText.substring(0, startPos) + "[](/" + emoteID + ")" + currentForm.innerText.substring(startPos);
				}
				setCursor(currentForm, endPos + (currentForm.innerText.length - formLength), endPos + (currentForm.innerText.length - formLength));
			}
			currentForm.focus();
			if(!getConf('defaultEmoteContainerMouseLeave')){
				toggleEmoteWindow(event, id, 1);
			}
			return;
		}
		
		function addTabs(){
			var containers = document.getElementsByClassName("GrEmBEmoteList");
			var currentTab = 0;
			for(var c = 0; c < containers.length; c++){
				tabs[currentTab] = containers[c];
				++currentTab;
			}
		}
		
		function openTab(evt){
			evt.preventDefault();
			evt.stopPropagation();
			var tabID = evt.target.getAttribute('tabID');
			if(tabID === undefined || tabID === false || tabID === null){
				return false;
			}
			var tabHeaders = document.getElementById("GrEmBtablist").childNodes[0];
			for(var t =0; t < tabHeaders.childNodes.length; t++){
				var tab = tabHeaders.childNodes[t].firstChild;
				var tID = tab.getAttribute('tabID');
				if(tabID == tID){
					tabs[tID].setAttribute("class", "GrEmBEmoteList");
				}else{
					tabs[tID].setAttribute("class", "GrEmBEmoteList closedTab");
				}
			}
			return false;
		}
		function updateCurrentForm(){
			if(!setUpTabs && (getConf("defaultEmoteContainerMLAS1") || getConf("defaultEmoteContainerILTBAT"))){
				if(!document.getElementById("GrEmBtablist")){
					debug(104, "Still no element? :S");
					return;
				}
				document.getElementById("GrEmBtablist").addEventListener("click", function (evt){
					openTab(evt);
				}, false);
				setUpTabs = true;
			}
			if(document.activeElement == document.body){
				return;
			}
			if((document.activeElement.id != "emName")&&(document.activeElement.tagName == "INPUTBOX" || document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA" || (document.activeElement.contentEditable && document.activeElement.tagName == "DIV"))&&(currentForm != document.activeElement || (window.frames[document.activeElement.name] && window.frames[document.activeElement.name].window && window.frames[document.activeElement.name].window.document && window.frames[document.activeElement.name].window.document.activeElement != currentForm))){
				currentForm = document.activeElement;
				if(currentForm.tagName == "IFRAME"){
					if(document.activeElement.contentWindow || document.activeElement.contentDocument){
						currentForm = document.activeElement.contentWindow.document.activeElement || document.activeElement.contentDocument.document.activeElement;
					} else {
						currentForm = window.frames[document.activeElement.name].window.document.activeElement;
					}
				}
			}

		}

		function toggleEmoteWindow(evt, id, f){
			var emoteWindow = document.getElementById("GrEmBEmoteWindow" + id);
			if(!emoteWindow){
				windowCreators[id]();
				emoteWindow = document.getElementById("GrEmBEmoteWindow" + id);
			}
			if(!emoteWindow){
				return debug(103, "Could not find emote window with ID: GrEmBEmoteWindow" + id + "... :( Something broke, report this error.");
			}
			if(f){
				emoteWindow.setAttribute("class", closedWindowClasses);
			} else {
				emoteWindow.setAttribute("class", (emoteWindow.getAttribute("class") == windowClasses) ? closedWindowClasses : windowClasses);
			}
			evt.preventDefault();
			evt.stopPropagation();
			evt.cancelBubble = true;
		}

		function mouseEnter(_fn){
			return function (_evt){
				var relTarget = _evt.relatedTarget;
				if(this === relTarget || isAChildOf(this, relTarget)){
					return;
				}
				_fn.call(this, _evt);
			}
		}

		function isAChildOf(_parent, _child){
			if(_parent === _child){
				return false;
			}
			var limit = 0;
			while(_child && _child !== _parent && limit < 10){
				_child = _child.parentNode;
				limit++;
			}
			if(limit >= 10){
				return false;
			}
			return _child === _parent;
		}
		
		function createEmoteWindow(id, side, x, y, z, w, h, emotes){ //Window ID,side,xPos,Ypos,zPos(Depth/zIndex),width,height,innerHTML for the emotes.
			if(window !== window.top){
				return;
			}
			if(document.getElementById("GrEmBEmoteToggle" + id)){
				return;
			}
			var windowToggler = document.createElement("div");
			windowToggler.id = "GrEmBEmoteToggle" + id;
			windowToggler.className = "GrEmBWindow";
			windowToggler.setAttribute("style", "color: black; z-index: " + z + "; position: fixed !important; top: " + y + "px; " + side + ": 10px;");
			var toggleText = '';
			if(side === "right"){
				toggleText = "<b>&lt;&lt;</b>";
			} else {
				toggleText = "<b>&gt;&gt;</b>";
			}
			windowToggler.innerHTML = '<span class="GrEmBTitleText">' + toggleText + '</span>';
			document.body.appendChild(windowToggler);

			windowCreators[id] = function(){
				var emoteWindow = document.createElement("div");
				emoteWindow.id = "GrEmBEmoteWindow" + id;
				emoteWindow.className = closedWindowClasses + " closedTab";
				emoteWindow.setAttribute("style", "color: black; z-index: " + (z + 1) + "; position: fixed !important; top: " + y + "px; " + side + ": 10px; width: " + w + "px; height: " + h + "px; max-width: " + ((+w) + 30) + "px; max-height: " + ((+h) + 30) + "px;");
				lt = rt = '';
				if(side === "right"){
					rt = '<span style="float: left; cursor: pointer; font-weight: bold; text-decoration: underline overline;" class="GrEmBTitleText" id="closeEmoteWindow' + id + '">X</span>&#160;&#160; ';
				} else {
					rt = ' &#160;&#160;<span style="float: right; cursor: pointer; font-weight: bold; text-decoration: underline overline;" class="GrEmBTitleText" id="closeEmoteWindow' + id + '">X</span>';
				}
				emoteWindow.innerHTML = "<span style='float: " + side + ";'>" + 'Click to place</span>' + rt + emotes() + '';
				
				document.body.appendChild(emoteWindow);
				
				emoteWindow.addEventListener("click", function (evt){
					return addEmote(evt, id);
				}, false);
				if(getConf("defaultEmoteContainerMouseLeave")){
					function closeFunc(evt){
							evt.stopPropagation();
							evt.cancelBubble = true;
							toggleEmoteWindow(evt, id, 1);
							if(currentForm){
								currentForm.focus();
							}
							evt.preventDefault();
						}
					emoteWindow.addEventListener('mouseout', mouseEnter(closeFunc), false);
				}
				document.getElementById('closeEmoteWindow'+id).addEventListener("click", function (evt){
					toggleEmoteWindow(evt, id, 1);
				}, false);
				emoteWindow.addEventListener("mouseover", function (evt){
					updateCurrentForm();
					return true;
				}, false);
				document.getElementById("emName").addEventListener("change",findEmoteChange);
				document.getElementById("emName").addEventListener("keydown",findEmoteChange);
				document.getElementById("emName").addEventListener("paste",findEmoteChange);
				document.getElementById("emNameReg").addEventListener("change",emoteRegChange);
				document.getElementById("GrEmBSearchList").innerHTML = ""+document.getElementById("GrEmBdefaultcontainer").firstChild.innerHTML;
				addTabs();
			}
			windowToggler.addEventListener("mouseover", function (evt){
				toggleEmoteWindow(evt, id);
			}, false);
		}

		function getDefaultEmoteHTML(){
			var lss = "font-size: 10pt; margin: 0; padding: 0; list-style: none !important;";
			var ls = lss + " display: inline-block !important; border: solid; border-width: 1px 1px 0 1px; margin: 0 0.15em 0 0;";
			var lsa = "padding: 0 0.15em;";
			var emotes = "";
			var search = "";
			var mlas1 = "";
			var iltbat = "";
			var currentTabID = 0;
			if(getConf('defaultEmoteContainerSearch')){
				search = '<li style="' + ls + '"><a style="' + lsa + '" href="#" tabID="' + currentTabID++ + '">find</a></li>';
			}
			var mlpTabID = currentTabID++;
			if(getConf('defaultEmoteContainerMLAS1')){
				mlas1 = '<li style="' + ls + '"><a style="' + lsa + '" href="#" tabID="' + currentTabID++ + '">mlas</a></li>';
			}
			if(getConf('defaultEmoteContainerILTBAT')){
				iltbat = '<li style="' + ls + '" id="selected"><a style="' + lsa + '" href="#" tabID="' + currentTabID++ + '">iltbat</a></li>';
			}
			
			if(search || mlas1 || iltbat){
				emotes = '<span id="GrEmBtablist"><ul class="GrEmBtabs" style="' + lss + '">' + search + '<li  style="' + ls + '" class="GrEmBtabs"><a tabID="'+mlpTabID+'" style="' + lsa + '" href="#">mlp</a></li>' + mlas1 + iltbat + '</ul></span>';
			}
			if(search != ""){
				emotes += "<div id='GrEmBsearchcontainer' style='overflow-y: auto !important;' class='GrEmBEmoteList'><label for='emName'>search:</label><input type='text' name='search' id='emName' style='max-width: 80%;'/><input title='Use regular expressions for search(advanced)' id=\"emNameReg\" type=\"checkbox\""+(getConf("emoteSearchReg")?" checked=\"checked\"":"")+"/><div id='GrEmBSearchList' style='height: " + (getConf("defaultEmoteContainerHeight") - 65) + "px; overflow-y: scroll !important;' class='GrEmBEmoteList_'></div></div>";
			}
			emotes += "<div id='GrEmBdefaultcontainer' class='GrEmBEmoteList closedTab'><div class='GrEmBEmoteList_'>";
			emotes += "/*rmlp.html*/";
			if(mlas1 != ""){
				emotes += "</div></div><div id='GrEmBMLAS1container' class='GrEmBEmoteList closedTab'><div class='GrEmBEmoteList_'>";
				emotes += "/*rmlas1nsfw.html*/";
			}
			if(iltbat != ""){
				emotes += "</div></div><div id='GrEmBILTBATcontainer' class='GrEmBEmoteList closedTab'><div class='GrEmBEmoteList_'>";
				emotes += "/*riltbat.html*/";
			}
			emotes += "</div></div>";
			return emotes;
		}

		function execAll(reg, string){
			var match = null;
			var matches = new Array();
			while(match = reg.exec(string)){
				emoteNames_[match[1]] = 1;
			}
			return matches;
		}
		
		function unique(arr){
			var o = {},
				i, l = arr.length,
				r = [];
			for(i = 0; i < l; i++){
				o[arr[i]] = arr[i];
			}
			for(i in o){
				r.push(o[i]);
			}
			return r;
		}
		
		function showDebugWindow(){
			if(document.getElementById("debugWindow")){
				return;
			}
			var debugWindow = document.createElement('div');
			debugWindow.id = 'debugWindow';
			debugWindow.innerHTML = "<a href=\"#\" id='debugWindowClose' style='text-decoration: underline; font-weight: bold;'>X</a><br />Debug info: <br /><textarea style=\"width: 98%;min-height:90%;max-height:95%\">" + ((JSON.stringify(GM_safeGetValue("confArray"))).replace(/\\n/g, "\n")) + "\n\n/**Emote Names:**/\n\n" + (JSON.stringify(emoteNames).replace(/\\n/g, "\n")) + "\n\n/**Emote Names_:**/\n\n" + "</textarea>";
			document.body.appendChild(debugWindow);
			document.getElementById('debugWindowClose').addEventListener("click", hideDebugWindow);
		}
		
		function hideDebugWindow(evt){
			var dbgWin = document.getElementById("debugWindow");
			if(dbgWin){
				document.body.removeChild(dbgWin);
			}
			if(evt){
				evt.cancelBubble = true;
				evt.stopPropagation();
				evt.preventDefault()
			}
		}
		
		function incLoadedStyles(){
			loadedStyles++;
			if(window.top === window && (showNotice || window.location.host == "nallar.me")){
				if(!document.getElementById("loadingNotice") && doRefresh){
					var cssElem = document.createElement('div');
					cssElem.id = 'loadingNotice';
					document.body.appendChild(cssElem);
				}
				if(document.getElementById("loadingNotice") && doRefresh){
					var ln = document.getElementById("loadingNotice");
					delete ln.style.display;
					ln.innerHTML = "Reloading cached CSS - " + loadedStyles + "/" + requiredStyles;
				}
				if(loadedStyles >= requiredStyles && doRefresh){
					window.location.reload();
				}
			}
		}
		
		function extractSubredditCSS(subname, doForce, urll, noParse, noLoad){
			if(!cssRun && !doForce){
				return;
			}
			requiredStyles++;
			var d = new Date();
			var cacheTime = cssAr[subname + "csstttt"];
			if(cacheTime === undefined){
				cacheTime = 0;
			}
			if(!noParse){
				var cacheData = cssAr[subname + "cssd"];
				if(cacheData === undefined){
					cacheData = "";
				}
				cssStore += (cacheData);
			} else if(!noLoad){
				loadStyleSheet(urll);
			}
			if(window.top != window || ((cacheTime + 14400000) > d.getTime() && (cacheData || noParse))){
				return incLoadedStyles();
			}
			if(subname != "MLPLounge"&&!doRefresh){
				doRefresh = true;
				loadedStyles--;
				incLoadedStyles();
			}
			if(!initRefresh){
				initRefresh = true;
				emoteNames_ = emoteNames;
			}
			var tm = timeOutCounter;
			if(urll == undefined){
				var urll = "http://reddit.com/r/" + subname + "/stylesheet.css";
			} else {
				tm = tm / 3;
			}
			urll += "?v=" + d.getTime();
			setTimeout(function (){
				GM_xmlhttpRequest({
					method: 'GET',
					url: urll,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey nallar.me/scripts/ GrEmB',
						'Accept': 'text/plain,text/html,text/css',
					},
					onload: function (res){
						styles = false;
						if(!noParse){
							var tempText = res.responseText.replace(/\/\*(?:[^]+?)\*\//g, "");
							tempText = tempText.replace(/\s+/g, " ");
							tempText = tempText.replace(/a(?:\.convertedEmote_)?\[href[\^\|]?\=['"]\/([a-zA-Z0-9_\-]+?)['"]\]/g,".G_$1_");
							execAll(/\.G_([0-9a-zA-Z]+)_/ig, tempText);
							execAll(/a\[href[\*\^\|]?=['"]\/([^'"]+?)['"]/g, tempText);
							confStore['emoteNames'] = emoteNames_;
							emoteNames = emoteNames_;
						}else{
							var tempText = res.responseText.replace(/\/\*(?:[^]+?)\*\//g, "");
							tempText = tempText.replace(/\s+/g, " ");
							execAll(/\.G_([0-9a-zA-Z]+)_/ig, tempText);
							execAll(/a(?:\.convertedEmote_)?\[href[\*\^\|]?=['"]\/([^'"]+?)['"]/g, tempText);
							confStore['emoteNames'] = emoteNames_;
							emoteNames = emoteNames_;
						}
						if(!noParse){
							var styles = tempText.match(/a\[href[\*\^\|]?=['"]\/[^}]+}/g);
							if(styles == null){
								styles = tempText.match(/.G_[a-zA-Z0-9_\-]+?_[^}]+}/g);
							}else{
								styles = styles.concat(tempText.match(/.G_[a-zA-Z0-9_\-]+?_[^}]+}/g));
							}
						}
						var d1 = new Date();
						if(styles){
							styles = styles.join(" ");
							styles = styles.replace(/\[href\=/g, "[href|=");
							cssAr[subname + "cssd"] = styles;
							cssStore += (styles);
							showCSS();
						}
						console.log("ct < dt, got new for sn: " + subname + "\t" + cacheTime + "\t" + d.getTime());
						cssAr[subname + "csstttt"] = String((+d1.getTime()));
						if(doSave++ > 3 || loadedStyles >= (requiredStyles - 1)){
							setConf('csssstore', cssAr);
						}
						return incLoadedStyles();
					}
				});
			}, tm);
			timeOutCounter += 2050;
		}
		
		//SEE http://jsperf.com/get-text-nodes-non-recursive

		var lTime = 0;
		function convertDefaultGlobalEmotes(root){
			if(((new Date()).getTime() - lTime)<1500){
				return;
			}
			if(convTimeout){
				clearTimeout(convTimeout);
			}
			if((!goEmote&&!wkMutation)||!globalConvert||root == null|| !(/\[\]\(\/.*?\)/).test(root.innerHTML)){
				return;
			}
			goEmote = false;
			var converted = 0, maxConvert = 300, dispUn = (!doRefresh), node = root.firstChild;
			if(node == null){
				debug(100,"No firstChild? :S");
			}
			while(node != null && converted < maxConvert){
				if(node.nodeType == 3){
					var text = node;
					var v;
					while(text.nodeValue && text.parentNode.className != "GlobalEmoteAltTextDisplay_Text" && (v = emoteMatchRegExp.exec(text.nodeValue)) && v[1] && converted < maxConvert){
						var pos = v['index'];
						v[1] = v[1].toLowerCase();
						if(!v[2] && v[3]){
							v[2] = v[3];
						}
						var beforeNode = text.splitText(pos);
						beforeNode.nodeValue = beforeNode.nodeValue.replace(emoteMatchRegExp, "");
						var emoteContainerElement = document.createElement('div');
						emoteContainerElement.style.display = "inline-block";
						var emoteElement = document.createElement('a');
						emoteElement.href =  '/' + v[1];
						emoteElement.setAttribute('style', 'display: inline-block !important; float: none !important;');
						if(v[2]){
							emoteElement.title = v[2];
						}
						emoteElement.className = 'convertedEmote convertedEmote_';
						
						var emoteInfo = (/^([\-a-zA-Z0-9_]+?)(-[\-a-zA-Z0-9_]+)?$/).exec(v[1]);
						if(emoteInfo){
							if(dispUn && (!emoteNames[emoteInfo[1]])){
								emoteElement.textContent = "/" + v[1];
								emoteElement.className += " G_unknownEmote";
								if(v[1].length > 20){
									emoteElement.className += " G_largeUnknown";
								}
								if(emoteInfo[2]){
									emoteElement.href=emoteInfo[1];
								}
							}else if((/^[\-a-zA-Z0-9_]+$/).test(emoteInfo[1])){
								emoteElement.className += " G_" + emoteInfo[1] + "_";
								if(emoteInfo[2]!=undefined) emoteElement.setAttribute('href',emoteElement.getAttribute('href') + '-');
							}
						}
						emoteContainerElement.appendChild(emoteElement);
						if(v[2]){
							expandConvertedEmotes(emoteElement,emoteContainerElement);
						}
						beforeNode.parentNode.insertBefore(emoteContainerElement, beforeNode);
						text = beforeNode;
						converted++;
					}
				}
				if (node.hasChildNodes()&&!(node.tagName && noGlobalTags[node.tagName])){
					node = node.firstChild;
				} else {
					while (node.nextSibling == null){
						node = node.parentNode;
						if (node == root){
							goEmote = true;
							return;
						}
					}
					node = node.nextSibling;
				}
			}
			if(converted >= maxConvert){
				debug(106,"Converted maximum number of emotes, delaying for 2 seconds.");
				convTimeout = setTimeout(function(){var oFind = goFind; goFind = false;convertDefaultGlobalEmotes(root);goFind=oFind;},2000);
				lTime = (new Date()).getTime();
			}
			goEmote = true;
		}
		
		//START MESS OF MY CODE+ArbitraryEntity's CODE
		function expandConvertedEmotes(anchor, emoteContainerElement){
			if(!goExpand){
				return;
			}
			goExpand = false;
			if(anchor.title && !noExpandEmotes[anchor.getAttribute('href')] && anchor.className.indexOf("emoteTextExpanded") == -1){
				var altText = anchor.title;
				var theDiv = document.createElement("div");
				theDiv.className = "SuperRedditAltTextDisplay_Text";
				theDiv.setAttribute("style", "display: inline-block !important;");
				while(altText){
					linkResult = linkRegex.exec(altText)
					if(linkResult){
						theDiv.appendChild(document.createTextNode(altText.substr(0, linkResult.index)))
						var newLinkElement = document.createElement("a")
						if(linkResult[1]){
							newLinkElement.href = linkResult[0]
						} else {
							newLinkElement.href = "http://" + linkResult[0]
						}
						newLinkElement.appendChild(document.createTextNode(linkResult[0]))
						theDiv.appendChild(newLinkElement)
						altText = altText.substr(linkResult.index + linkResult[0].length)
					} else {
						theDiv.appendChild(document.createTextNode(altText))
						altText = ""
					}
				}

				var linkNextSibling = anchor.nextSibling
				emoteContainerElement.appendChild(theDiv)
				anchor.className += " emoteTextExpanded";
			}
			goExpand = true;
		}
		//END ArbitraryEntity's code!
		function fixHomePageNSFW(target){
			if(!isReddit){
				return;
			}
			var elements = target.getElementsByClassName("over18");
			for(var el in elements){
				var e = elements[el];
				if(!e.getElementsByClassName){
					continue;
				}
				if(e.getElementsByClassName('subreddit')[0] && (/mylittlepony/).test(e.getElementsByClassName('subreddit')[0].innerHTML)){
					e.getElementsByClassName('nsfw-stamp')[0].setAttribute('style', 'border: #5F99CF 1px solid !important;display: inline-block;font-size: 0px !important;letter-spacing: 0px;overflow: hidden;vertical-align: bottom;margin-bottom: -1px');
					e.getElementsByClassName('nsfw-stamp')[0].innerHTML = '';
					var v = document.createElement("div");
					v.setAttribute("style","color: #336699 !important;display: block;font-size: x-small !important;text-decoration: none;visibility: visible !important");
					v.innerHTML = "&#160;SPOILER";
					e.getElementsByClassName('nsfw-stamp')[0].appendChild(v);
					if(e.getElementsByClassName('thumbnail')[0]){
						e.getElementsByClassName('thumbnail')[0].setAttribute('style', 'background-image: url(\'http://i.imgur.com/NS6ZH.png\'); background-size: 67px 57px; background-position: 0 0;width:67px; height: 57px; background-repeat: no-repeat;');
					}
				};

			}
		}
		
		function clickBlock(evt){
				var anchor = evt.target;
				if(anchor && anchor.getAttribute('href') && anchor.innerHTML == ""){
					var href = (/^\/([a-zA-Z0-9]+)(-[^\/]+?)?$/).exec(anchor.getAttribute('href'));
					if(href && (emoteNames[href[1]] || /convertedEmote_/.test(anchor.className))){
						evt.cancelBubble = true;
						evt.preventDefault();
						evt.stopPropagation();
					}
				}
			}
			
		function youtubeInlineExpand(anchor,id,startTime){
			anchor.className += 'ytExpand';
			var ytDiv = document.createElement("div");
			ytDiv.className = "expando-button collapsed video expando-inline";
			ytDiv.setAttribute('style','vertical-align:top !important;float:none;width:23px !important;height:23px !important; max-width: 23px !important; max-height: 23px !important;display:inline-block;margin-right:6px;cursor:pointer;padding:0px');
			var videoFrame = false,br = false;
			function onClick(){
				if(ytDiv.className.indexOf('collapsed')==-1){
					ytDiv.className = 'expando-button video expando-inline collapsed';
					ytDiv.parentNode.removeChild(videoFrame);
					ytDiv.parentNode.removeChild(br);
				}else{
					if(!videoFrame){
						videoFrame = document.createElement("iframe");
						videoFrame.className = "youtube-player";
						videoFrame.width = 450;
						videoFrame.height = 366;
						videoFrame.type = "text/html";
						videoFrame.src = 'http://www.youtube.com/embed/' + id + '#t=' + startTime;
						videoFrame.frameBorder = 0;
					}
					ytDiv.parentNode.insertBefore(videoFrame,ytDiv.nextSibling);
					videoFrame.parentNode.insertBefore((br =document.createElement("br")),videoFrame);
					ytDiv.className = 'expando-button video expando-inline expanded';
				}
			};
			anchor.parentNode.insertBefore(ytDiv, anchor.nextSibling);
			ytDiv.addEventListener("click", onClick);
		}
		
		function domInsertFunction(evt){
			if(!goFind){
				return;
			}
			goFind = false;
			if(evt.target.getElementsByTagName){
				if(!isReddit){
					convertDefaultGlobalEmotes(evt.target);
				};
				var dispUn = (!doRefresh), inSub = (/\.com\/r\//).test(window.location.href), imageAlt = getConf('emoteCopy'), ytExpand = true, msgs = [];
				if(markdownConvert){
					if((/(?:^|\s)(?:md|livePreview)(?:\s|$)/i.test(evt.target.className))){
						msgs = [evt.target];
					}else{
						msgs = evt.target.getElementsByClassName("md");
					}
					for(var j = 0, len = msgs.length; j < len; j++){
						var elems = msgs[j].getElementsByTagName("A");
						for(var i = 0, len2 = elems.length; i < len2; i++){
							var emElem = elems[i];
							if((/(?:^|\s)convertedEmote(?:\s|$)/).test(emElem.className)||emElem.childNodes.length||(/ytExpand/).test(emElem.className)){
								continue;
							}
							if(ytExpand){
								var ytData = (/(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?(?:.*&)*v=([a-zA-Z0-9\-_]+)(?:#t=(.*)$)?|http:\/\/(?:www\.)?youtu.be\/([^\?]+))/).exec(emElem.getAttribute('href'));
								if(ytData){
									if(ytData[3]){
										youtubeInlineExpand(emElem,ytData[3],ytData[4]);
									}else{
										youtubeInlineExpand(emElem,ytData[1],ytData[2]);
									}
									continue;
								}
							}
							var hrefs = emElem.getAttribute('href');
							emElem.className += " convertedEmote";
							var hrefss = (/^\/([a-zA-Z0-9_!\%]+)(-[^\/]+?)?$/).exec(hrefs);
							if(!hrefss){
								continue;
							}
							var href = hrefss[1];
							emElem.className += " convertedEmote_";
							if(dispUn && emElem.textContent == "" && !(((/(?:^|\s)G_unknownEmote(?:\s|$)/).test(emElem.className))) && (!emoteNames[href]) && (!inSub||(emElem.clientWidth == 0&&window.getComputedStyle(emElem,':after').backgroundImage == "none" && window.getComputedStyle(emElem,':before').backgroundImage == "none"))){
								emElem.textContent = "/" + href + ((hrefss[2] != undefined) ? hrefss[2] : "");
								if(href.length > 20){
									emElem.className += " G_unknownEmote G_largeUnknown";
								}else{
									emElem.className += " G_unknownEmote";
								}
								if(hrefss[2] != undefined){
									emElem.href = "/" + href;
								}
							} else if((/^[\-a-zA-Z0-9_]+$/).test(href)){
								emElem.className += " G_" + href + "_";
								if(hrefss[2] != undefined)emElem.href = hrefs + '-';
							}
							if(emElem.title!=""){//This block is derived from ArbitraryEntity's code.
							//Get permission from ArbitraryEntity to include it if you are making a clone of this script.
							//Or, code your own replacement for it!
								var altText = emElem.title;
								var theDiv = document.createElement("div");
								theDiv.className = "SuperRedditAltTextDisplay_Text";
								if((/(?:(-in(?:p-|-|p$|$))|(?:-lalt(?:-|$)))/).test(emElem.getAttribute('href'))){
									theDiv.setAttribute("style", "display: inline-block !important;");
								}
								while(altText){
									linkResult = linkRegex.exec(altText);
									if(linkResult){
										theDiv.appendChild(document.createTextNode(altText.substr(0, linkResult.index)));
										var newLinkElement = document.createElement("a");
										if(linkResult[1]){
											newLinkElement.href = linkResult[0];
										} else {
											newLinkElement.href = "http://" + linkResult[0];
										}
										newLinkElement.appendChild(document.createTextNode(linkResult[0]));
										theDiv.appendChild(newLinkElement);
										altText = altText.substr(linkResult.index + linkResult[0].length);
									} else {
										theDiv.appendChild(document.createTextNode(altText));
										altText = "";
									}
								}
								if((/(?:-lalt(?:-|$))/).test(emElem.getAttribute('href'))){
									emElem.parentNode.insertBefore(theDiv, emElem);
									theDiv.setAttribute("style",theDiv.getAttribute("style")+"float: left !important;");
								}else{
									emElem.parentNode.insertBefore(theDiv, emElem.nextSibling);
								}
							}//End ArbitraryEntity's code
							if(imageAlt){
								var copyImage = document.createElement("img");
								copyImage.alt = "[](/" + href + ((hrefss[2] != undefined) ? hrefss[2] : "") + ' "' + emElem.title + '")';
								copyImage.style.fontSize = '0px';
								emElem.parentNode.insertBefore(copyImage,emElem);
							}
						}
					}
				}
			}
			goFind = true;
		};
		
		function initialEmotePass(){
			if(ranInitial){
				return;
			} 
			sSSection();
			ranInitial = true;
			if(isReddit&&(/reddit\.com(?:\/r\/[^\/]+?\+|\/?$)/).test(window.location.href)){
				fixHomePageNSFW(document.body);
			}
			domInsertFunction({
				target: document.body
			});
			if(getConf("defaultEmoteContainer") && (isReddit||getConf("defaultEmoteContainerEverywhere"))){
				createDefWindow();
			}
			wt += endSSection("initial conversion pass");
			var tt = endSection("Total time taken");
			debug(100,"frm: "+window.location.href+"\ttsr: "+wt+"ms\t(extern)tsl: "+(tt-wt)+"ms");
			document.body.addEventListener("click", clickBlock, false);
			if(wkMutation){
				(new wkMutation(function(mutations, observer){
					var target;
					for(var i = 0, len = mutations.length; i < len;i++){
						target = {target:mutations[i].target};
						domInsertFunction(target);
					}
				})).observe(document.body, {subtree: true, childList: true, characterData: true, attributes: !isReddit,});
			}else{
				document.body.addEventListener('DOMNodeInserted', domInsertFunction);
				document.body.addEventListener('DOMNodeInsertedIntoDocument', domInsertFunction);
			}
		};
		function createDefWindow(){
			sSSection();
			createEmoteWindow(0, getConf("defaultEmoteContainerSide") ? "left" : "right", getConf("defaultEmoteContainerX"), getConf("defaultEmoteContainerY"), (getConf("defaultEmoteContainerOnTop") || !isReddit) ? 99999 : 11, getConf("defaultEmoteContainerWidth"), getConf("defaultEmoteContainerHeight"), getDefaultEmoteHTML);
			wt += endSSection("initial conversion pass");
		};
		
					if(isFF){			function debug(level, text) {				if(103/*REPLACE*/ < level) {					console.log(text);				}			};		}else{			function debug(level, text) {				if(103/*REPLACE*/ < level) {					console.log("GrEmB> "+text);				}			};		}		var sTime = 0, ssTime = 0;				sSection = function () {				sTime = (new Date()).getTime();
			};

			endSection = function (name) {
				var retV = 0;
				if(sTime != 0) {
					retV=((new Date()).getTime() - sTime);
				} else {
					debug(103, "no section started");
				}
				return retV;
			};
			
			sSSection = function () {
				ssTime = (new Date()).getTime();
			};

			sSection();
			sSSection();
				
			endSSection = function (name) {
				var retV = 0;
				if(ssTime != 0) {
					retV=((new Date()).getTime() - ssTime);
				} else {
					debug(103, "no section started");
				}
				return retV;
			};
		
		
		var lastSearch = '';
		var resultSet = false;
		var emoteNamesArray = false;
		var timer = false;
		//Start emote search code
		function emoteRegChange(evt){
			setConf("emoteSearchReg",document.getElementById("emNameReg").checked);
			return true;
		}

		function findEmoteChange(evt){
			clearTimeout(timer);
			timer=setTimeout(function(){findEmote(evt.target.value,getConf("emoteSearchReg"))},1000);
		}
		
		function findEmote(search, findReg){
			var searchArray;
			if(emoteNamesArray === false){
				emoteNamesArray = [];
				for(var emoteName in emoteNames){
					emoteNamesArray.push(emoteName);
				}
				emoteNamesArray.sort();
			}
			if((search.indexOf(lastSearch)!=-1) && lastSearch && !findReg){
				searchArray = resultSet;
			}else{
				searchArray = emoteNamesArray;
			}
			resultSet = [];
			if(findReg){
				var cachedFindReg = new RegExp(search);
				for(var emote = 0; emote < searchArray.length; emote++){
					if(new RegExp(search).test(searchArray[emote])){
						resultSet.push(searchArray[emote]);
					}
				}
			}else{
				for(var emote = 0; emote < searchArray.length; emote++){
					if(searchArray[emote].indexOf(search) != -1){
						resultSet.push(searchArray[emote]);
					}
				}
			}
			lastSearch = search;
			//console.log(resultSet);
			var searchList = document.getElementById("GrEmBSearchList");
			var ihtml = "";
			for(var i = 0; i < resultSet.length; i++){
				ihtml += "<div title='/"+resultSet[i]+"' class='G_"+resultSet[i]+"_ G_small'></div>";
			}
			searchList.innerHTML = ihtml;
			ihtml = false;
			//return resultSet;
		}
		//End emote search code
		/////////////////////////////END FUNCTIONS////////////////////////////
		
		//START DYNAMIC (using above functions) VARS//
		var markdownConvert = isReddit;
		var globalConvert = !isReddit&&getConf('emoteManagerEverywhere');
		var cssAr = getConf('csssstore');
		var showNotice = getConf('justReset')&&(setConf('justReset', false)||true);
		//END DYNAMIC VARS
		
		//Start script body!
		
		
		
		if(getConf("lastVersion") != localVersion){
			confStore["lastVersion"] = localVersion;
			confStore['csssstore'] = {};
			confStore['emoteNames'] = defaultConfs['emoteNames'];
			confStore['justReset'] = true;
			removeDefunctConfs();
			emoteNames = defaultConfs['emoteNames'];
			emoteNames_ = defaultConfs['emoteNames'];
			window.location.replace(window.location.href.replace(/csscachereset=1/g, ""));
			if(doNotUse != ""){
				alert(doNotUse);
			}
		} else if((/allconfreset=1/).test(window.location.href)){
			GM_deleteValue("confArray");
			window.location.replace(window.location.href.replace(/allconfreset=1/g, ""));
		}
		
		if(window.top === window){
			properOnLoadEvent_(function(){setTimeout(addSBConf,300);});
		}
		
		
		
		var emoteNames = getConf('emoteNames');
		if((emoteNames instanceof Array)){
			emoteNames = defaultConfs['emoteNames'];
		}
		
		if(isReddit||globalConvert||getConf("defaultEmoteContainerEverywhere")){
			extractSubredditCSS('manySubCSS', false, mainStylesheet, true, true);
			loadStyleSheet(mainStylesheet);
			if(getConf("otherSubCSS")){
				extractSubredditCSS('otherSubCSS', false, otherStylesheet, true, true);
				loadStyleSheet(otherStylesheet);
			}
			if(getConf("nsfwDefunctEmotes")){
				extractSubredditCSS('nsfwSubCSS', false, nsfwStylesheet, true, true);
				loadStyleSheet(nsfwStylesheet,true);
			}
		}
		
		var i = getConf("additionalSubreddits_");
		if(i){
			i = i.split(",");
			for(var n = 0, llen = i.length; n < llen;n++){
				i[n] = trim(i[n]).toLowerCase();
				if(subs.indexOf(i[n]) == -1){
					extractSubredditCSS(i[n]);
				}
			}
		}
		
		if(true){
			if(getConf('searchbarSpikeEverywhere') || (isReddit && getConf("searchbarSpike"))){
				cssStore += ('#search input[type="text"] {background: url(http://thumbs.reddit.com/t5_2s8bl_4.png) top left no-repeat !important; padding: 13px 2px 13px 50px !important;height: 22px !important; width: 245px !important}');
			}
			if((/\/r\/MLPLounge/i).test(window.location.href)){
				//extractSubredditCSS("MLPLounge");
				cssStore += ('code{font-family: monospace !important;} ');
				/*cssStore += ('pre code {font-family: "arial,sans-serif"}');*/
			}
			cssStore += ('.G_small{max-width:225px !important; max-height: 300px !important;} .convertedEmote_{cursor: default;padding: 0 0 0 0 !important;margin: 0 0 0 0 !important; border-radius: 0px !important;clear:none;float:left;display:block}.closedWindow{visibility: hidden !important;}.closedTab{display: none !important;}.GrEmBEmoteList_{overflow-y: scroll !important; overflow-x: hidden; height: ' + (getConf("defaultEmoteContainerHeight") - 39) + 'px;width: ' + (getConf("defaultEmoteContainerWidth") - 2) + 'px;} .GrEmBEmoteList_ div{cursor: pointer;} .G_unknownEmote{font-family: monospace; font-size: small !important;word-break:break-all;word-wrap:break-word;color:rgb(255,255,255) !important;cursor:text !important;background-color:rgb(105,105,120) !important;display:block;clear:none;float:left;width:50px;height:50px;}.G_largeUnknown{width:70px;height:70px;}.GrEmBTitleText{font-size: 12.5pt; font-weight: bold;}.SuperRedditAltTextDisplay_Text {color: gray !important; word-break:break-all;word-wrap:break-word;} .SuperRedditAltTextDisplay_Text a {color: gray !important; text-decoration:underline !important;}.GlobalEmoteAltTextDisplay_Text {color: gray; word-wrap: break-word; display:inline-block}.GlobalEmoteAltTextDisplay_Text a {color: gray; text-decoration:underline; display:inline-block}.G_spoiler_:hover{background:#000; color: #fff;}.G_spoiler_::after{content: "" !important;}');
			if(isReddit||getConf('emoteManagerEverywhere')){
				cssStore += ("a.convertedEmote_[href*='-r-']{-moz-transform:scaleX(-1);-webkit-transform:scaleX(-1);-o-transform:scaleX(-1);}a.convertedEmote_[href*='-blink!']{text-decoration:blink !important}a.convertedEmote_[href*='-comicsans!']{font-family:'Comic-Sans MS',cursive}.convertedEmote_[href*='-impact!']{font-family:Impact,Charcoal,sans-serif}a.convertedEmote_[href*='-tahoma!']{font-family:Tahoma,Geneva,sans-serif}a.convertedEmote_:hover[href*='-r-'][href*='-d-'],a.convertedEmote_:hover[href*='-r-'][href*='-d-']{-moz-transform:rotate(0deg)scaleX(1);-o-transform:rotate(0deg)scaleX(1);-webkit-transform:rotate(0deg)scaleX(1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-45-'],a.convertedEmote_:hover[href*='-45-'][href*='-r-'][href*='-d-']{-moz-transform:rotate(45deg)scaleX(1);-o-transform:rotate(45deg)scaleX(1);-webkit-transform:rotate(45deg)scaleX(1)}a.convertedEmote_[href*='-90-'],a.convertedEmote_:hover[href*='-90-'][href*='-r-'][href*='-d-']{-moz-transform:rotate(90deg)scaleX(1);-o-transform:rotate(90deg)scaleX(1);-webkit-transform:rotate(90deg)scaleX(1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-135-'],a.convertedEmote_:hover[href*='-135-'][href*='-r-'][href*='-d-']{-moz-transform:rotate(135deg)scaleX(1);-o-transform:rotate(135deg)scaleX(1);-webkit-transform:rotate(135deg)scaleX(1);}a.convertedEmote_[href*='-180-'],a.convertedEmote_:hover[href*='-180-'][href*='-r-'][href*='-d-']{-moz-transform:rotate(180deg)scaleX(1);-o-transform:rotate(180deg)scaleX(1);-webkit-transform:rotate(180deg)scaleX(1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-225-'],a.convertedEmote_:hover[href*='-225-'][href*='-r-'][href*='-d-']{-moz-transform:rotate(225deg)scaleX(1);-webkit-transform:rotate(225deg)scaleX(1);-o-transform:rotate(225deg)scaleX(1);}a.convertedEmote_[href*='-270-'],a.convertedEmote_:hover[href*='-270-'][href*='-r-'][href*='-d-']{-moz-transform:rotate(270deg)scaleX(1);-o-transform:rotate(270deg)scaleX(1);-webkit-transform:rotate(270deg)scaleX(1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-315-'],a.convertedEmote_:hover[href*='-315-'][href*='-r-'][href*='-d-']{-moz-transform:rotate(315deg)scaleX(1);-o-transform:rotate(315deg)scaleX(1);-webkit-transform:rotate(315deg)scaleX(1);}a.convertedEmote_[href*='-r-'],a.convertedEmote_:hover[href*='-d-'],a.convertedEmote_:hover[href*='-dancer-']{-moz-transform:rotate(0deg)scaleX(-1);-o-transform:rotate(0deg)scaleX(-1);-webkit-transform:rotate(0deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-45-'][href*='-r-'],a.convertedEmote_:hover[href*='-45-'][href*='-d-']{-moz-transform:rotate(45deg)scaleX(-1);-o-transform:rotate(45deg)scaleX(-1);-webkit-transform:rotate(45deg)scaleX(-1)}a.convertedEmote_[href*='-90-'][href*='-r-'],a.convertedEmote_:hover[href*='-90-'][href*='-d-']{-moz-transform:rotate(90deg)scaleX(-1);-o-transform:rotate(90deg)scaleX(-1);-webkit-transform:rotate(90deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-135-'][href*='-r-'],a.convertedEmote_:hover[href*='-135-'][href*='-d-']{-moz-transform:rotate(135deg)scaleX(-1);-webkit-transform:rotate(135deg)scaleX(-1);-o-transform:rotate(135deg)scaleX(-1);}a.convertedEmote_[href*='-180-'][href*='-r-'],a.convertedEmote_:hover[href*='-180-'][href*='-d-']{-moz-transform:rotate(180deg)scaleX(-1);-o-transform:rotate(180deg)scaleX(-1);-webkit-transform:rotate(180deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-225-'][href*='-r-'],a.convertedEmote_:hover[href*='-225-'][href*='-d-']{-moz-transform:rotate(225deg)scaleX(-1);-o-transform:rotate(225deg)scaleX(-1);-webkit-transform:rotate(225deg)scaleX(-1);}a.convertedEmote_[href*='-270-'][href*='-r-'],a.convertedEmote_:hover[href*='-270-'][href*='-d-']{-moz-transform:rotate(270deg)scaleX(-1);-o-transform:rotate(270deg)scaleX(-1);-webkit-transform:rotate(270deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-315-'][href*='-r-'],a.convertedEmote_:hover[href*='-315-'][href*='-d-']{-moz-transform:rotate(315deg)scaleX(-1);-o-transform:rotate(315deg)scaleX(-1);-webkit-transform:rotate(315deg)scaleX(-1);}a.convertedEmote_[href*='-225-'][href*='-f-'][href*='-r-'],a.convertedEmote_:hover[href*='-225-'][href*='-f-'][href*='-d-']{-moz-transform:rotate(45deg)scaleX(1);-webkit-transform:rotate(45deg)scaleX(1);-o-transform:rotate(45deg)scaleX(1)}a.convertedEmote_[href*='-270-'][href*='-f-'][href*='-r-'],a.convertedEmote_:hover[href*='-270-'][href*='-f-'][href*='-d-']{-moz-transform:rotate(90deg)scaleX(1);-webkit-transform:rotate(90deg)scaleX(1);-o-transform:rotate(90deg)scaleX(1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-315-'][href*='-f-'][href*='-r-'],a.convertedEmote_:hover[href*='-315-'][href*='-f-'][href*='-d-']{-moz-transform:rotate(135deg)scaleX(1);-webkit-transform:rotate(135deg)scaleX(1);-o-transform:rotate(135deg)scaleX(1)}a.convertedEmote_[href*='-f-'][href*='-r-'],a.convertedEmote_:hover[href*='-f-'][href*='-d-']{-moz-transform:rotate(180deg)scaleX(1);-webkit-transform:rotate(180deg)scaleX(1);-o-transform:rotate(180deg)scaleX(1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-45-'][href*='-f-'][href*='-r-'],a.convertedEmote_:hover[href*='-45-'][href*='-f-'][href*='-d-']{-moz-transform:rotate(225deg)scaleX(1);-webkit-transform:rotate(225deg)scaleX(1);-o-transform:rotate(225deg)scaleX(1)}a.convertedEmote_[href*='-90-'][href*='-f-'][href*='-r-'],a.convertedEmote_:hover[href*='-90-'][href*='-f-'][href*='-d-']{-moz-transform:rotate(270deg)scaleX(1);-webkit-transform:rotate(270deg)scaleX(1);-o-transform:rotate(270deg)scaleX(1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-135-'][href*='-f-'][href*='-r-'],a.convertedEmote_:hover[href*='-135-'][href*='-f-'][href*='-d-']{-moz-transform:rotate(315deg)scaleX(1);-webkit-transform:rotate(315deg)scaleX(1);-o-transform:rotate(315deg)scaleX(1)}a.convertedEmote_[href*='-225-'][href*='-f-'],a.convertedEmote_:hover[href*='-225-'][href*='-f-'][href*='-r-'][href*='-d-']{-moz-transform:rotate(45deg)scaleX(-1);-webkit-transform:rotate(45deg)scaleX(-1);-o-transform:rotate(45deg)scaleX(-1)}a.convertedEmote_[href*='-270-'][href*='-f-'],a.convertedEmote_:hover[href*='-270-'][href*='-f-'][href*='-r-'][href*='-d-']{-moz-transform:rotate(90deg)scaleX(-1);-webkit-transform:rotate(90deg)scaleX(-1);-o-transform:rotate(90deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-315-'][href*='-f-'],a.convertedEmote_:hover[href*='-315-'][href*='-f-'][href*='-r-'][href*='-d-']{-moz-transform:rotate(135deg)scaleX(-1);-webkit-transform:rotate(135deg)scaleX(-1);-o-transform:rotate(135deg)scaleX(-1)}a.convertedEmote_[href*='-f-'],a.convertedEmote_[href*='-fuckingcrazy-'],a.convertedEmote_:hover[href*='-f-'][href*='-r-'][href*='-d-']{-moz-transform:rotate(180deg)scaleX(-1);-o-transform:rotate(180deg)scaleX(-1);-webkit-transform:rotate(180deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-45-'][href*='-f-'],a.convertedEmote_:hover[href*='-45-'][href*='-f-'][href*='-r-'][href*='-d-']{-moz-transform:rotate(225deg)scaleX(-1);-o-transform:rotate(225deg)scaleX(-1);-webkit-transform:rotate(225deg)scaleX(-1)}a.convertedEmote_[href*='-90-'][href*='-f-'],a.convertedEmote_:hover[href*='-90-'][href*='-f-'][href*='-r-'][href*='-d-']{-moz-transform:rotate(270deg)scaleX(-1);-o-transform:rotate(270deg)scaleX(-1);-webkit-transform:rotate(270deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-135-'][href*='-f-'],a.convertedEmote_:hover[href*='-135-'][href*='-f-'][href*='-r-'][href*='-d-']{-moz-transform:rotate(315deg)scaleX(-1);-o-transform:rotate(315deg)scaleX(-1);-webkit-transform:rotate(315deg)scaleX(-1)}a.convertedEmote_:hover[href*='-rd-']{-moz-transform:rotate(0deg)scaleX(1);-o-transform:rotate(0deg)scaleX(1);-webkit-transform:rotate(0deg)scaleX(1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-90d-'],a.convertedEmote_:hover[href*='-90rd-']{-moz-transform:rotate(90deg)scaleX(1);-o-transform:rotate(90deg)scaleX(1);-webkit-transform:rotate(90deg)scaleX(1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-180d-'],a.convertedEmote_:hover[href*='-fd-']{-moz-transform:rotate(180deg)scaleX(1);-o-transform:rotate(180deg)scaleX(1);-webkit-transform:rotate(180deg)scaleX(1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-270d-'],a.convertedEmote_:hover[href*='-270rd-']{-moz-transform:rotate(270deg)scaleX(1);-o-transform:rotate(270deg)scaleX(1);-webkit-transform:rotate(270deg)scaleX(1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-rd-']{-moz-transform:rotate(0deg)scaleX(-1);-o-transform:rotate(0deg)scaleX(-1);-webkit-transform:rotate(0deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-90r-'],a.convertedEmote_[href*='-90rd-'],a.convertedEmote_:hover[href*='-90d-']{-moz-transform:rotate(90deg)scaleX(-1);-o-transform:rotate(90deg)scaleX(-1);-webkit-transform:rotate(90deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-fd-'],a.convertedEmote_:hover[href*='-180d-']{-moz-transform:rotate(180deg)scaleX(-1);-o-transform:rotate(180deg)scaleX(-1);-webkit-transform:rotate(180deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href*='-270r-'],a.convertedEmote_[href*='-270rd-'],a.convertedEmote_:hover[href*='-270d-']{-moz-transform:rotate(270deg)scaleX(-1);-o-transform:rotate(270deg)scaleX(-1);-webkit-transform:rotate(270deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a.convertedEmote_[href='/sp']{display: inline-block !important;padding-right: 100% !important;float: none !important;}");
			}

			if(!getConf("disableEmoteSpin")&&(isReddit||getConf('emoteManagerEverywhere'))){
				cssStore += ('a.convertedEmote_[href*=-spin-],  a.convertedEmote_[href*=-spin-]{ -moz-transform-style: flat; -moz-animation: spin 2s infinite ease; -moz-transform: translateZ(-360px) rotateX(360deg); -webkit-transform-style: flat; -webkit-animation: spin 2s infinite ease; -webkit-transform: translateZ(-360px) rotateX(360deg);}a.convertedEmote_[href*=-ispin-], a.convertedEmote_[href*=-ispin-] { -moz-transform-style: flat; -moz-animation: ispin 2s infinite linear; -moz-transform: translateZ(-360px) rotateX(360deg); -webkit-transform-style: flat; -webkit-animation: ispin 2s infinite linear; -webkit-transform: translateZ(-360px) rotateX(360deg);} a.convertedEmote_[href*=-yspin-] {-moz-transform: translateZ(50px); -moz-transform-style: flat; -moz-animation: yspin 2s infinite linear; -webkit-transform: translateZ(50px); -webkit-transform-style: flat; -webkit-animation: yspin 2s infinite linear;} a.convertedEmote_[href*=-xspin-] {-moz-transform-style: flat; -moz-transform: rotateX(0deg); -moz-animation: xspin 2s infinite ease; -webkit-transform: rotateX(0deg); -webkit-transform-style: flat; -webkit-animation: xspin 2s infinite ease;}a.convertedEmote_[href*=-rotate-], a.convertedEmote_[href*=-rotate-] { -moz-transform-style: flat; -moz-animation: rotate 2s infinite ease; -moz-transform: translateZ(0px) rotateX(0deg); -webkit-transform-style: flat; -webkit-animation: rotate 2s infinite ease;}a.convertedEmote_[href*=-rrotate-] { -moz-transform-style: flat; -moz-animation: rrotate 2s infinite ease; -moz-transform: translateZ(0px) rotateX(0deg); -webkit-transform-style: flat; -webkit-animation: rotater 2s infinite ease;}a.convertedEmote_[href*=-lrotate-] { -moz-transform-style: flat; -moz-animation: lrotate 2s infinite linear; -moz-transform: translateZ(0px) rotateX(0deg); -webkit-transform-style: flat; -webkit-animation: rotatel 2s infinite linear;}a.convertedEmote_[href*=-lrrotate-] { -moz-transform-style: flat; -moz-animation: lrrotate 2s infinite linear; -moz-transform: translateZ(0px) rotateX(0deg); -webkit-transform-style: flat; -webkit-animation: rotatelr 2s infinite linear;}@-moz-keyframes xspin { from { -moz-transform: rotateX(0deg);} to { -moz-transform: rotateX(360deg); } }@-webkit-keyframes spin { from { -webkit-transform: rotateY(0) translateZ(0px) rotateX(0deg);} to {-webkit-transform: rotateY(360deg) translateZ(100px) rotateX(360deg); } }@-webkit-keyframes ispin { from { -webkit-transform: rotateY(0) translateZ(0px) rotateX(0deg);} to { -webkit-transform: rotateY(360deg) translateZ(100px) rotateX(360deg); } }@-moz-keyframes spin { from { -moz-transform: rotateY(0) translateZ(0px) rotateX(0deg);} to {-moz-transform: rotateY(360deg) translateZ(100px) rotateX(360deg); } }@-webkit-keyframes xspin { from { -webkit-transform: rotateX(0deg);} to { -webkit-transform: rotateX(360deg); } }@-moz-keyframes ispin { from { -moz-transform: rotateY(0) translateZ(0px) rotateX(0deg);} to { -moz-transform: rotateY(360deg) translateZ(100px) rotateX(360deg); } }@-webkit-keyframes yspin { from { -webkit-transform: rotateY(0)} to { -webkit-transform: rotateY(360deg);} }@-moz-keyframes yspin { from { -moz-transform: rotateY(0)} to { -moz-transform: rotateY(360deg);} }@-moz-keyframes rotate { from { -moz-transform: rotate(0deg);} to {-moz-transform: rotate(360deg); } }@-moz-keyframes rrotate { from { -moz-transform: rotate(0deg);} to {-moz-transform: rotate(-360deg); } }@-moz-keyframes lrotate { from { -moz-transform: rotate(0deg);} to {-moz-transform: rotate(360deg); } }@-moz-keyframes lrrotate { from { -moz-transform: rotate(0deg);} to {-moz-transform: rotate(-360deg); } }@-webkit-keyframes rotate { from { -webkit-transform: rotate(0deg);} to {-webkit-transform: rotate(360deg); } }@-webkit-keyframes rotater { from { -webkit-transform: rotate(0deg);} to {-webkit-transform: rotate(-360deg); } }@-webkit-keyframes rotatel { from { -webkit-transform: rotate(0deg);} to {-webkit-transform: rotate(360deg); } }@-webkit-keyframes rotatelr { from { -webkit-transform: rotate(0deg);} to {-webkit-transform: rotate(-360deg); } } @-moz-keyframes zspin{from{-moz-transform:rotate(0deg)scaleX(1)rotatez(0deg)}to{-moz-transform:rotate(0deg)scaleX(1)rotatez(360deg)}}@-webkit-keyframes zspin{from{-webkit-transform:rotate(0deg)scaleX(1)rotatez(0deg)}to{-webkit-transform:rotate(0deg)scaleX(1)rotatez(360deg)}} a.convertedEmote_[href*="-zspin-"]{-moz-animation:zspin 2s infinite linear;-webkit-animation:zspin 2s infinite linear;image-rendering:-moz-crisp-edges}');
			}
			cssStore += ("a.convertedEmote_[href*='-i-']{ -o-filter: hue-rotate(180deg) !important; filter: hue-rotate(180deg) !important; -webkit-filter: hue-rotate(180deg) !important;} a.convertedEmote_[href*='-inp-'], a.convertedEmote_[href*='-in-']{ float: none !important; display: inline-block !important;}");
			
			cssStore += ('a.convertedEmote_[href="/sbf"], a.convertedEmote_[href="/rsbf"] {display: block; clear:none; float:left; background-image: url(http://i.imgur.com/baE1o.png); width: 80px; height: 66px;}');

			var redditSize = (getConf("wideReddit") ? 'max-width: none !important; width: auto !important;' : '');
			cssStore += ('.commentNavSortType{display: inline-block !important;} .comment .md{overflow-y: hidden !important; ' + redditSize + '} .livePreview{'+redditSize+'} #loadingNotice {text-align: center; font-size: 30px;width: 500px;top:50px; margin: 0 auto; position: fixed;border: 1px solid blue; background-color: white; margin-top: 36px; z-index: 9999999999;left: 75%;margin-left: -250px;}#debugWindow {top: 5%;width: 80%;height: 90%;margin: 0 auto; position: fixed;border: 1px solid blue; background-color: white; z-index: 9999999999;left: 10%;} .GrEmBWindow{height: auto !important; width: auto !important;' + getConf("emoteManagerWindowStyle") + "}\n\n"); //This is last so that broken user styles do not break the rest of the CSS.
		}
		showCSS();
		wt += endSSection("Added styles and initialised");
		properOnLoadEvent_(initialEmotePass);
	};

function loadStyleSheet(filename,override){
	var fileref = document.createElement("link");
	fileref.rel = "stylesheet";
	fileref.type = "text/css";
	fileref.href = filename;
	fileref.async = true;
	if(override){
		document.head.appendChild(fileref);
	}else{
		document.head.insertBefore(fileref, document.head.firstChild);
	}
}

function properOnLoadEvent(cb){
	if(document.readyState === "complete" && document.getElementsByTagName("head")[0]){
		cb();
	} else {
		/*document.addEventListener("DOMContentLoaded", function (){
			if((document.readyState === "complete") && document.getElementsByTagName("head")[0]){
				cb();
			}
		}, false);*/
		document.addEventListener("readystatechange", function (){
			if((document.readyState === "complete") && document.getElementsByTagName("head")[0]){
				cb();
			}
		}, false);
	}
}

function properOnLoadEvent_(cb){
	if((document.readyState === "complete" || document.readyState === "interactive") && document.getElementsByTagName("head")[0]){
		cb();
	} else {
		/*document.addEventListener("DOMContentLoaded", function (){
			if((document.readyState === "complete" || document.readyState === "interactive") && document.getElementsByTagName("head")[0]){
				cb();
			}
		}, false);*/
		document.addEventListener("readystatechange", function (){
			if((document.readyState === "complete" || document.readyState === "interactive") && document.getElementsByTagName("head")[0]){
				cb();
			}
		}, false);
	}
}

function properOnLoadEvent__(cb){
	if(document.getElementsByTagName("head")[0]){
		cb();
	} else {
		/*document.addEventListener("DOMContentLoaded", function (){
			if(document.getElementsByTagName("head")[0]){
				cb();
			}
		}, false);*/
		document.addEventListener("readystatechange", function (){
			if(document.getElementsByTagName("head")[0]){
				cb();
			}
		}, false);
	}
}

function fakeTimeout(callback){
	if(window.top === window){
		properOnLoadEvent__(callback);
		return;
	}
	properOnLoadEvent__(function(){
	document.head.addEventListener("timeoutEvent", function (){
		properOnLoadEvent__(callback);
	}, false);
	var ev = document.createEvent("HTMLEvents");
	ev.initEvent("timeoutEvent", true, false);
	document.head.dispatchEvent(ev);});
}

if(!ranPassFunction){
	var runScript = function(){fakeTimeout(passFunction);}
		chrome.extension.sendRequest({method: "getConf"},function(response){if(response.data){confStore = JSON.parse(response.data);} runScript();});	
}