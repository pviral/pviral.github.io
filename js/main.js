// API to call
// https://api.twitch.tv/kraken/search/streams?q=starcraft
(function init(window, undefined) {
	"use strict";

	const baseURL = "https://api.twitch.tv/kraken/search/streams?";

	//use query selector to demostrate 
	//we can use css type syntax to get dom elem
	var searchBtn = document.querySelector('.searchBox > .searchBtn');
	var inputElem = document.querySelector('.searchBox > input');

	attachEventHanlder();

	/**
	 * callback function once API receives success
	 *
	 * @method responseReceived
	 * @param  {object} response server response object
	 */
	var responseReceived = function(response) {
		window.updateList(response);
		// reset input field
		// disable the button
		inputElem.value = '';
		toggleSearchBtn();
	}	

	/**
	 * attach event handlers on page
	 *
	 * @method attachEventHanlder
	 */
	function attachEventHanlder() {
		searchBtn.addEventListener('click', getTwitchStream, false);
		inputElem.addEventListener('keyup', toggleSearchBtn, false);
	}

	/**
	 * enable or disable button based on query
	 *
	 * @method toggleSearchBtn
	 */
	function toggleSearchBtn() {
		var queryStr = inputElem.value.trim();

		if(queryStr) {
			if(searchBtn.hasAttribute('disabled')) {
				searchBtn.removeAttribute('disabled');
				searchBtn.removeAttribute('title');
				searchBtn.classList.remove('disabled');
			}
		}
		else {
			if(!searchBtn.hasAttribute('disabled')) {
				searchBtn.setAttribute('disabled', 'disabled');
				searchBtn.classList.add('disabled');
				searchBtn.setAttribute('title', 'Please enter search query to enable the button');
			}
		}
	}

	/**
	 * get stream based on new query param
	 *
	 * @method getTwitchStream
	 */
	function getTwitchStream() {
		var queryStr = inputElem.value.trim();

		if(queryStr) {
			var url = baseURL+'q='+queryStr+'&limit=6&offset=0'
		}
		window.location.hash = 'q='+queryStr+'&limit=6&offset=0';

		window.JSONP(url, responseReceived);
	}

	function handleLocationChange() {
		console.log(location.hash);
	}
	window.addEventListener("hashchange", handleLocationChange, true);

	// default we will call with starcraft query
	// when page loads first time
	window.JSONP(undefined, responseReceived);
})(window);