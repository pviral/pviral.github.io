(function(window, undefined) {
	"use strict";

  var JSONP = function(url, callback) {
    // by default we will query for starcraft
    url = url || 'https://api.twitch.tv/kraken/search/streams?q=starcraft&limit=6&offset=0&callback=responseReceived';
    callback = callback || function(){};

    // generating id for callback
    var generatedFunction = 'jsonp'+Math.round(Math.random()*1000001);

    window[generatedFunction] = function(repsonse){
      callback(repsonse);
      //clean up
      delete window[generatedFunction];
    };

    if(url.indexOf('?') === -1){ url = url+'?'; }
    else{ url = url+'&'; }

    // for jsonp we cannot use native xhr
    // so have to create script and attached to dom
    var jsonpScript = document.createElement('script');
    jsonpScript.setAttribute("src", url+'callback'+'='+generatedFunction);
    document.getElementsByTagName("head")[0].appendChild(jsonpScript);
  }

  window.JSONP = JSONP;
  
})(window);