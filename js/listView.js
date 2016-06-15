(function(window, undefined) {
	"use strict";

	const LIMIT = 6;

	var updateList = function(response) {

		// we are creating document fragement
		// and than create HTML structre and 
		// later append to DOM tree
		var docFrag = document.createDocumentFragment();

		// update the summary section
		var resultCount = document.getElementsByClassName("totalResultCount")[0];
		var paginationPages = document.getElementsByClassName("paginationPages")[0];

		resultCount.textContent = response._total;
		paginationPages.textContent = 1+"/"+Math.ceil(response._total/LIMIT);


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