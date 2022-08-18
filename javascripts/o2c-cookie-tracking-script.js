setTimeout(function(){

//UTM Cookies
	
// get cookie without js-cookie library
var btCookies = document.cookie 
  .split(';')
  .map(cookie => cookie.split('='))
  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});	

//get utm cookie values		
var btUTMs = btCookies.utm_source;
var btUTMm = btCookies.utm_medium;
var btUTMca = btCookies.utm_campaign;
var btUTMco = btCookies.utm_content;
var btUTMt = btCookies.utm_term;

//UTMs via URL	
	
//Get UTM query string from url	
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

//Store UTM query string values from url
var utmURLs = getQueryVariable('utm_source');
var utmURLm = getQueryVariable('utm_medium');
var utmURLca = getQueryVariable('utm_campaign');
var utmURLco = getQueryVariable('utm_content');
var utmURLt = getQueryVariable('utm_term');	

//check if URL utm has value, if not add placeholder value	
if( typeof utmURLs !== 'undefined' ) {
    document.querySelector('input[name="btURLSource"]').value = utmURLs;
} else { document.querySelector('input[name="btURLSource"]').value = "n/a"; }
	
if( typeof utmURLm !== 'undefined' ) {
    document.querySelector('input[name="btURLMedium"]').value = utmURLm;
} else { document.querySelector('input[name="btURLMedium"]').value = "n/a"; }
	
if( typeof utmURLca !== 'undefined' ) {
    document.querySelector('input[name="btURLCampaign"]').value = utmURLca;
} else { document.querySelector('input[name="btURLCampaign"]').value = "n/a"; }	
	
if( typeof utmURLco !== 'undefined' ) {
    document.querySelector('input[name="btURLContent"]').value = utmURLco;
} else { document.querySelector('input[name="btURLContent"]').value = "n/a"; }	
	
if( typeof utmURLt !== 'undefined' ) {
    document.querySelector('input[name="btURLTerm"]').value = utmURLt;
} else { document.querySelector('input[name="btURLTerm"]').value = "n/a"; }	

// Set final cookies 
function setCookie(cName, cValue) {
	document.cookie = cName + "=" + cValue + "; path=/";
}

//Get UTM values from URL
var utmVal = window.location.search.indexOf('?utm') > -1;

//If UTM contains value in URL, clear cookie values, set/store utm url values as cookie.
if (utmVal) {
console.log('utm URL has values. Clear cookie values, store utm url values');
	
//Campaign UTM Values
var fURLcampaign = document.querySelector('input[name="btURLCampaign"]').value;
setCookie('utm_campaign', fURLcampaign);
	
//Content UTM Values
var fURLcontent = document.querySelector('input[name="btURLContent"]').value;
setCookie('utm_content', fURLcontent);
	
//Medium UTM Values
var fURLmedium = document.querySelector('input[name="btURLMedium"]').value;
setCookie('utm_medium', fURLmedium);
	
//Source UTM Values
var fURLsource = document.querySelector('input[name="btURLSource"]').value;
setCookie('utm_source', fURLsource);
	
//Term UTM Values
var fURLterm = document.querySelector('input[name="btURLTerm"]').value;
setCookie('utm_term', fURLterm);
	
} else {
console.log('utm URL no values. Do nothing.');
}
	
//Insert Final UTM value into Marketo Form
if (fURLcampaign) { document.querySelector('input[name="UTM_Campaign__c"]').value = fURLcampaign; }
if (fURLcontent) { document.querySelector('input[name="UTM_Content__c"]').value = fURLcontent; }
if (fURLmedium) { document.querySelector('input[name="UTM_Medium__c"]').value = fURLmedium; }
if (fURLsource) { document.querySelector('input[name="UTM_Source__c"]').value = fURLsource; }
if (fURLterm) { document.querySelector('input[name="UTM_Term__c"]').value = fURLterm; }

},1500);


//  New solution via Final Referrer Cookie

setTimeout(function(){	

//Get fs and rs source cookie 
var btCookies = document.cookie 
  .split(';')
  .map(cookie => cookie.split('='))
  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

//Get fs source cookie, check if cookie has value. Input value into form field	
btCookies.fs_source;
var btFSsource = btCookies.fs_source;

if (typeof btFSsource !== 'undefined') {
	console.log('FS Source Variable is NOT undefined');
    document.querySelector('input[name="fsSource"]').value = btFSsource;
} else {console.log('FS Source Variable IS undefined');}		
	
//Get rs source cookie, check if cookie has value. If no value, input direct into form field	
btCookies.rs_source;
var btRSsource = btCookies.rs_source;
	
if (typeof btRSsource === 'undefined') {
	console.log('RS Source Cookie is Undefined');
    document.querySelector('input[name="rsSource"]').value = "direct";
} else {
	console.log('RS Source Cookie has a value');
	document.querySelector('input[name="rsSource"]').value = btRSsource;
}
 
//create variable and capture fs_source and rs_source cookie values for cookie scenerios  
var fsBTsourceCookie = document.querySelector('input[name="fsSource"]').value;
var rsBTsourceCookie = document.querySelector('input[name="rsSource"]').value;	

// Get and display Cookie Value to make sure cookie value is correct	
console.log(fsBTsourceCookie);
console.log(rsBTsourceCookie);

//Cookie scenerio	
if ((fsBTsourceCookie === "direct") && (rsBTsourceCookie === "direct") || (fsBTsourceCookie === "www.billtrust.com" && rsBTsourceCookie === "www.billtrust.com") || (fsBTsourceCookie === "direct") && (rsBTsourceCookie === "www.billtrust.com") || (fsBTsourceCookie === "www.billtrust.com" && rsBTsourceCookie === "direct") ) {
	console.log("fs and rs say either direct or bt.com");
	document.querySelector('input[name="tempString12"]').value = "direct";
	
} else if ((fsBTsourceCookie === "direct" && rsBTsourceCookie === "") || (fsBTsourceCookie === "www.billtrust.com" && rsBTsourceCookie === "")) {
	
	console.log("fs says direct or bt.com and rs is blank");
	document.querySelector('input[name="tempString12"]').value = "direct"; //always = direct
	
} else if ((fsBTsourceCookie === "direct" && rsBTsourceCookie !== "") || (fsBTsourceCookie === "www.billtrust.com" && rsBTsourceCookie !== "")){
	
	console.log("fs says direct or bt.com and rs is not blank and doesn't equal direct or bt.com");
	document.querySelector('input[name="tempString12"]').value = rsBTsourceCookie; //capture rs_source cookie
	
} else if ((fsBTsourceCookie !== "direct" && rsBTsourceCookie === "") || (fsBTsourceCookie !== "www.billtrust.com" && rsBTsourceCookie === "")){
	
	console.log("fs doesn't equal direct or bt.com and rs is blank");
	document.querySelector('input[name="tempString12"]').value = rsBTsourceCookie; //capture rs_source cookie
	
} else if ((fsBTsourceCookie !== "direct" && rsBTsourceCookie !== "direct") && (fsBTsourceCookie !== "direct" && rsBTsourceCookie !== "www.billtrust.com") && (fsBTsourceCookie !== "www.billtrust.com" && rsBTsourceCookie !== "www.billtrust.com") && (fsBTsourceCookie !== "www.billtrust.com" && rsBTsourceCookie !== "direct")){
	
	console.log("fs and rs doesn't equal direct or bt.com");
	document.querySelector('input[name="tempString12"]').value = rsBTsourceCookie; //capture rs_source cookie
	
} else {
	console.log("fs doesn't equal direct or bt.com and rs is not blank and doesn't equal direct or bt.com");
	document.querySelector('input[name="tempString12"]').value = fsBTsourceCookie; //capture fs_source cookie
}  

//Create final referrer cookie based on cookie scenerio above  
var btReferrerFinalCookie = document.querySelector('input[name="tempString12"]').value;

// Apply setCookie to create final referrer cookie value
setCookie('btReferrerFinalCookie', btReferrerFinalCookie);
	
// Get and display final referrer cookie value	
console.log(btReferrerFinalCookie);

//Insert final referrer cookie value into Marketo form  
if (btReferrerFinalCookie) {
  document.querySelector('input[name="Referrer__c"]').value = btReferrerFinalCookie;
}

//check if referrer is bt.com or 3rd party. if 3rd party check if url includes utms. if not, replace cookie utms with n/a
	
//check if referrer contains bt.com or not	
var cRef = document.referrer.indexOf('https://www.billtrust') == 0;
var futmVal = window.location.search.indexOf('?utm') == 0;
var ref = document.referrer.length == 0;	
	
// get cookie without js-cookie library
var btCookies = document.cookie 
  .split(';')
  .map(cookie => cookie.split('='))
  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});	

//get utm cookie values		
var btUTMs = btCookies.utm_source;
var btUTMm = btCookies.utm_medium;
var btUTMca = btCookies.utm_campaign;
var btUTMco = btCookies.utm_content;
var btUTMt = btCookies.utm_term;	
	
//if referrer is not bt.com or blank, check if url includes utms. if not, replace cookie utms with n/a, else do nothing
if ((cRef || ref) && (!futmVal && typeof btUTMs !== 'undefined')) {
	console.log('referrer is billtrust, no utms in url and utm cookies have values. Do Nothing');
} else if ((!cRef || !ref) && (!futmVal && typeof btUTMs !== 'undefined')) {
	console.log('referrer is not billtrust, no utms in url and utm cookies have values');
	
//Campaign UTM Values
var fREFcampaign = document.querySelector('input[name="btURLCampaign"]').value;
setCookie('utm_campaign', fREFcampaign);

//Content UTM Values
var fREFcontent = document.querySelector('input[name="btURLContent"]').value;
setCookie('utm_content', fREFcontent);

//Medium UTM Values
var fREFmedium = document.querySelector('input[name="btURLMedium"]').value;
setCookie('utm_medium', fREFmedium);

//Source UTM Values
var fREFsource = document.querySelector('input[name="btURLSource"]').value;
setCookie('utm_source', fREFsource);

//Term UTM Values
var fREFterm = document.querySelector('input[name="btURLTerm"]').value;
setCookie('utm_term', fREFterm);

//Insert Final UTM value into Marketo Form
if (fREFcampaign) { document.querySelector('input[name="UTM_Campaign__c"]').value = fREFcampaign; }
if (fREFcontent) { document.querySelector('input[name="UTM_Content__c"]').value = fREFcontent; }
if (fREFmedium) { document.querySelector('input[name="UTM_Medium__c"]').value = fREFmedium; }
if (fREFsource) { document.querySelector('input[name="UTM_Source__c"]').value = fREFsource; }
if (fREFterm) { document.querySelector('input[name="UTM_Term__c"]').value = fREFterm; }	
	
} else {console.log('do nothing');}

},2000);