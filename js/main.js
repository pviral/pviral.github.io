// API to call
// https://api.twitch.tv/kraken/search/streams?q=starcraft
(function init() {
	console.log("main function intialize sdsdd");
	
	var responseReceived = function(response) {
		console.log(response);
	}

	function handleLocationChange() {
		console.log(location.hash);
	}

	

	function attachClickHanlder() {

	}
	window.addEventListener("hashchange", handleLocationChange, true);
	window.JSONP(undefined, responseReceived);
})();