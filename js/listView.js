(function(window, undefined) {
	"use strict";

	const LIMIT = 6;
	var nextPage = document.getElementsByClassName("pagination-next")[0];
	var previousPage = document.getElementsByClassName("pagination-previous")[0];

	var updateList = function(response) {

		// we are creating document fragement
		// and than create HTML structre and 
		// later append to DOM tree
		var docFrag = document.createDocumentFragment();

		// update the summary section
		var resultCount = document.getElementsByClassName("totalResultCount")[0];
		var paginationPages = document.getElementsByClassName("paginationPages")[0];
		var currOffset = parseInt(response._links.next.split("&")[1].slice(7));
		var currentPage = (currOffset <= 6)? 1 : ((currOffset/LIMIT));

		resultCount.textContent = response._total;
		paginationPages.textContent = currentPage+"/"+Math.ceil(response._total/LIMIT);

		// if we reach first or last page
		// disable pagination for prev and next resp
		if(response._links.prev) {
			previousPage.dataset['prevUrl'] = response._links.prev;
		}
		else if(previousPage.dataset['prevUrl']) {
			delete previousPage.dataset.prevUrl
		}

		if(currOffset < response._total) {
			nextPage.dataset['url'] = response._links.next;
		}
		else if(nextPage.dataset['url']) {
			delete nextPage.dataset['url'];
		}

		//update list section
		var streamList = response.streams;
		var ulElem = document.getElementsByClassName("resultList")[0];

		// for each stream create li and it chrildren element
		// append to document fragment
		streamList.forEach(function(i) {

			var li = document.createElement('li');
			var imgHolderDiv = document.createElement('div');
			var streamDetailsDiv = document.createElement('div');
			var img = document.createElement('img');
			var streamMetaDataP = document.createElement('p');
			var gameInfoP = document.createElement('p');
			var streamDescriptionSpan = document.createElement('span');
			var titleH1 = document.createElement('h1');

			imgHolderDiv.setAttribute('class', 'imgHolder');
			img.setAttribute('src', i.preview.template.replace(/{width}|{height}/g, "70"));
			img.setAttribute('width', '70px');
			img.setAttribute('height', '70px;');
			imgHolderDiv.appendChild(img);
			
			streamMetaDataP.setAttribute('class', 'streamMetadata');
			gameInfoP.setAttribute('class', 'gameTitle');
			streamDetailsDiv.setAttribute('class', 'streamDetails');
			streamDescriptionSpan.setAttribute('class', 'streamDescription');

			titleH1.textContent = i.game;
			titleH1.setAttribute('title', i.game);
			gameInfoP.textContent = i.game + " - " + i.viewers + " viewers";
			streamDescriptionSpan.textContent = i.channel.status;

			streamMetaDataP.appendChild(gameInfoP);
			streamMetaDataP.appendChild(streamDescriptionSpan);
			streamDetailsDiv.appendChild(titleH1);
			streamDetailsDiv.appendChild(streamMetaDataP);

			li.appendChild(imgHolderDiv);
			li.appendChild(streamDetailsDiv);
			li.dataset.id = i._id;
			
			docFrag.appendChild(li);

		});

		// clear exisitng child nodes of ul
		clearResultList();

		ulElem.appendChild(docFrag);

		/**
		 * clear DOM tree when page refresh
		 *
		 * @method clearResultList
		 */
		function clearResultList() {
			while (ulElem.firstChild) {
				ulElem.removeChild(ulElem.firstChild);
			}
		}
	};

	window.updateList = updateList;

})(window)