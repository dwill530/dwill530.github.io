//MutationObserver to check if DOM has changed to trigger event and send to Marketo	
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var observer = new MutationObserver(myFunction);
var observer25 = new MutationObserver(myFunction25);
var observer50 = new MutationObserver(myFunction50);
var observer75 = new MutationObserver(myFunction75);	

//Video Stated MutationObserver	
var element = document.getElementById('btVimeoStarted');	
observer.observe(element, {
childList: true
});

function myFunction() {
if (element.innerHTML === "Started"){
	console.log('btVimeoStarted worked!!!');
	var btVimeoVideoTitle = document.getElementById("btVimeoTitle").innerHTML;
	var btVimeoVideoID = document.getElementById("btVimeoID").innerHTML;
	Munchkin.munchkinFunction('visitWebPage', {
			url: '/munchkinVideoTracker/?vimeoVideo=' + btVimeoVideoTitle,
			params: '&videoID=' + btVimeoVideoID + '&movie-action=pressed-play'
	});
	observer.disconnect();
}	
}	
	
//Video 25% MutationObserver	
var element25 = document.getElementById('btVimeoPercent25');	
observer25.observe(element25, {
childList: true
});

function myFunction25() {
if (element25.innerHTML === "Yes25"){
	console.log('btVimeoPercent25 25%!!!');
	var btVimeoVideoTitle = document.getElementById("btVimeoTitle").innerHTML;
	var btVimeoVideoID = document.getElementById("btVimeoID").innerHTML;
	Munchkin.munchkinFunction('visitWebPage', {
			url: '/munchkinVideoTracker/?vimeoVideo=' + btVimeoVideoTitle,
			params: '&videoID=' + btVimeoVideoID + '&movie-action=achieved-milestone&percent=25%'
	});
	observer25.disconnect();
}	
}		
	
//Video 50% MutationObserver	
var element50 = document.getElementById('btVimeoPercent50');	
observer50.observe(element50, {
childList: true
});

function myFunction50() {
if (element50.innerHTML === "Yes50"){
	console.log('btVimeoPercent50 50%!!!');
	var btVimeoVideoTitle = document.getElementById("btVimeoTitle").innerHTML;
	var btVimeoVideoID = document.getElementById("btVimeoID").innerHTML;
	Munchkin.munchkinFunction('visitWebPage', {
			url: '/munchkinVideoTracker/?vimeoVideo=' + btVimeoVideoTitle,
			params: '&videoID=' + btVimeoVideoID + '&movie-action=achieved-milestone&percent=50%'
	});
	observer50.disconnect();
}	
}
	
//Video 75% MutationObserver	
var element75 = document.getElementById('btVimeoPercent75');	
observer75.observe(element75, {
childList: true
});

function myFunction75() {
if (element75.innerHTML === "Yes75"){
	console.log('btVimeoPercent75 75%!!!');
	var btVimeoVideoTitle = document.getElementById("btVimeoTitle").innerHTML;
	var btVimeoVideoID = document.getElementById("btVimeoID").innerHTML;
	Munchkin.munchkinFunction('visitWebPage', {
			url: '/munchkinVideoTracker/?vimeoVideo=' + btVimeoVideoTitle,
			params: '&videoID=' + btVimeoVideoID + '&movie-action=achieved-milestone&percent=75%'
	});
	observer75.disconnect();
}	
}	
	
	
// Vimeo Video Tracking	
var btVimeo = document.getElementById("btVimeo");
var btVimeoPlayer = new Vimeo.Player(btVimeo);

const onPlay = function(data) {
    // data is an object containing properties specific to that event
	console.log('played it!');
};

btVimeoPlayer.on('play', onPlay);	
	
//Check if Vimeo video started
btVimeoPlayer.on('play', function() {
	console.log('played the video!');
	document.getElementById("btVimeoPlayed").innerHTML = "Yes";
});
	
//Capture Vimeo video title
btVimeoPlayer.getVideoTitle().then(function(title) {
	console.log('title:', title);
	document.getElementById("btVimeoTitle").innerHTML = title;
});	
	
//Capture Vimeo video ID
btVimeoPlayer.getVideoId().then(function(id) {
	console.log('Video ID:', id);
	document.getElementById("btVimeoID").innerHTML = id;
});		

//Capture if Vimeo video is playing - duration, percent, seconds	
btVimeoPlayer.on('playing', function(playing) {
    {
    duration: 61.857
    percent: 0
    seconds: 0
	}
});
	
//Capture video playing process percent. If milestone meet, send to Marketo. 	
btVimeoPlayer.on('timeupdate', function(timeupdate) {
    {
    duration: 61.857
    percent: 0.50
    seconds: 31.928
	}

	document.getElementById("btVimeoPercent").innerHTML = timeupdate.percent;
	
	var billtrustVimeoPercent = document.getElementById("btVimeoPercent").innerHTML;
	var billtrustVimeoPercent2 = document.getElementById("btVimeoPercent").innerHTML;
	var btVimeoVideoTitle = document.getElementById("btVimeoTitle").innerHTML;
	
	if (billtrustVimeoPercent === "0.001") {
		console.log('video timeupdate started video');
		document.getElementById("btVimeoPercent").style.color = "black";
		document.getElementById("btMilestone").innerHTML = "Played";
		document.getElementById("btVimeoStarted").innerHTML = "Started";
		
	} else if (billtrustVimeoPercent >= "0.250" && billtrustVimeoPercent2 <= "0.499") {
		console.log('video timeupdate eqauls 25%');
		document.getElementById("btVimeoPercent").style.color = "red";
		document.getElementById("btMilestone").innerHTML = "25%";
		document.getElementById("btVimeoPercent25").innerHTML = "Yes25";
		
	} else if (billtrustVimeoPercent >= "0.500" && billtrustVimeoPercent2 <= "0.749") {
		console.log('video timeupdate eqauls 50%');
		document.getElementById("btVimeoPercent").style.color = "green";
		document.getElementById("btMilestone").innerHTML = "50%";
		document.getElementById("btVimeoPercent50").innerHTML = "Yes50";
		
	} else if (billtrustVimeoPercent >= "0.750" && billtrustVimeoPercent2 <= "0.999") {
		console.log('video timeupdate eqauls 75%');
		document.getElementById("btVimeoPercent").style.color = "yellow";
		document.getElementById("btMilestone").innerHTML = "75%";
		document.getElementById("btVimeoPercent75").innerHTML = "Yes75";
		
	} else if (billtrustVimeoPercent === "1") {
		console.log('video timeupdate eqauls 100%');
		document.getElementById("btVimeoPercent").style.color = "pink";
		document.getElementById("btMilestone").innerHTML = "100%";
		
	} else {
		document.getElementById("btVimeoPercent").style.color = "orange";
		document.getElementById("btMilestone").innerHTML = "N/A";
	}
});
	
//Check if Vimeo video ended. 	
btVimeoPlayer.on('ended', function(ended) {
	{
    duration: 61.857
    percent: 1
    seconds: 61.857
	}
	console.log('video ended!');
	document.getElementById("btVimeoFinished").innerHTML = "Yes";
	
var vimeoVidEnded = document.getElementById("btVimeoFinished").innerHTML;
	
if (vimeoVidEnded === "Yes") {
	// If video ended. Wait 1 second to trigger tracking then clear video values

var btVimeoVideoTitle = document.getElementById("btVimeoTitle").innerHTML;
var btVimeoVideoID = document.getElementById("btVimeoID").innerHTML;	

Munchkin.munchkinFunction('visitWebPage', {
url: '/munchkinVideoTracker/?vimeoVideo=' + btVimeoVideoTitle,
params: '&videoID=' + btVimeoVideoID + '&movie-action=played-to-end'
});

	setTimeout(function () {
		document.getElementById("btVimeoPlayed").innerHTML = "";
		document.getElementById("btVimeoPercent").innerHTML = "";
		document.getElementById("btMilestone").innerHTML = "";
		document.getElementById("btVimeoFinished").innerHTML = "";
		document.getElementById("btVimeoStarted").innerHTML = "";
		document.getElementById("btVimeoPercent25").innerHTML = "";
		document.getElementById("btVimeoPercent50").innerHTML = "";
		document.getElementById("btVimeoPercent75").innerHTML = "";
	}, 1000);
	
}
    
});