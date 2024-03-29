// playback percentages, log action when reached
var playbackMilestones = [ 25, 50, 75 ];

// Retrieves the data-youtube-id attribute value
var btytid = document.querySelector('#ytplayer');

if (btytid) {
	// Retrieves the data-youtube-id attribute value
	var youtubeVideoId = btytid.dataset.youtubeId;
	// Retrieves YouTube Title
	var youtubeVideoTitle = btytid.dataset.youtubeTitle;
	console.log( "YouTube video present on page" );
} else {
	console.log( "NO YouTube video on page" );
}

// Function to send data to Piwik PRO
function sendToPiwikPRO(action, percentage) {
    window._paq = window._paq || [];
    window._paq.push(['trackEvent', 'Video - YouTube', action, youtubeVideoTitle, percentage]);
}

// Execute video engagement tracking - send to Marketo via API
if( youtubeVideoId && youtubeVideoId != "false" ) {

	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var player;

	function onYouTubePlayerAPIReady() {
		// ...create YT Player object
		player = new YT.Player('ytplayer', {
			height: '360',
			width: '640',
			videoId: youtubeVideoId,
			playerVars: { 'controls': 1, 'cc_load_policy': 1, 'rel': 0 },
			events: { 'onStateChange': onPlayerStateChange }
		});
	}

/*
	// Returns unique YouTube video ID
	function getVideoId() {
		return youtubeVideoId;
	}
	*/

	// Returns current time code (minutes:seconds) of video
	function getTimeCode() {
		var minutes = Math.floor( player.getCurrentTime() / 60);
		var seconds = Math.round( player.getCurrentTime() % 60);
		if(minutes < 10) minutes = "0" + minutes;
		if(seconds < 10) seconds = "0" + seconds;
		return minutes + ":" + seconds;
	}

	// Returns current percentage of video that has been played
	function getPlaybackPercentage() {
		return Math.round( 100 * ( player.getCurrentTime() / player.getDuration() ) );
	}

/*
	// Returns YouTube Title
	function getVideoTitle() {
		return youtubeVideoTitle;
	}
	*/

	// Track which playback milestones have been achieved
	var pmAchieved = [];
	for(i=0;i<playbackMilestones.length;i++) {
		pmAchieved.push(false);
		console.log(playbackMilestones[i]);
	}

	// When user interacts with video, tell Marketo (via Munchkin API)
	function onPlayerStateChange( event ) {
		var percentage = getPlaybackPercentage();
		switch( event.data ) {

			// User played video
			case YT.PlayerState.PLAYING:
				console.log( "User played video" );
				logPlaybackMilestones();
				Munchkin.munchkinFunction('visitWebPage', {
					url: '/munchkinVideoTracker/?video=' + youtubeVideoTitle,
					params: '&videoID=' + youtubeVideoId + '&movie-action=pressed-play&percent=' + percentage
				});
				sendToPiwikPRO('Play', percentage);
				break;

			// User paused video
			case YT.PlayerState.PAUSED:
			console.log( "User paused video" );
				Munchkin.munchkinFunction('visitWebPage', {
					url: '/munchkinVideoTracker/?video=' + youtubeVideoTitle,
					params: '&videoID=' + youtubeVideoId + '&movie-action=paused&percent=' + percentage
				});
				sendToPiwikPRO('Pause', percentage);
				break;

			// User watched video to end
			case YT.PlayerState.ENDED:
			console.log( "watched video to end" );
				Munchkin.munchkinFunction('visitWebPage', {
					url: '/munchkinVideoTracker/?video=' + youtubeVideoTitle,
					params: '&videoID=' + youtubeVideoId + '&movie-action=played-to-end&percent=' + percentage
				});
				sendToPiwikPRO('Watched', percentage);
				break;

		}
	}

// Log video playback milestones
	function logPlaybackMilestones() {

		// if video is playing...
		if( player.getPlayerState() == 1 ) {
			console.log( "logPlaybackMilestones" );
			// then check to see whether we're at a playback milestone
			for(i=0;i<playbackMilestones.length;i++) {

				// if we are...
				if( !pmAchieved[i] && playbackMilestones[i] == getPlaybackPercentage() ) {
					console.log( "test" );
					// ...make a note of that...
					pmAchieved[i] = true;
					// ...and tell Marketo
					console.log( "tell Marketo" );
					Munchkin.munchkinFunction('visitWebPage', {
						url: '/munchkinVideoTracker/?video=' + youtubeVideoTitle,
						params: '&videoID=' + youtubeVideoId + '&movie-action=achieved-milestone&percent=' + getPlaybackPercentage()
					});
					sendToPiwikPRO('Progress - ' + playbackMilestones[i] + '%', getPlaybackPercentage());
				}
			}
			// then check again in 1 second
			setTimeout(logPlaybackMilestones,500);
		}
	}

}