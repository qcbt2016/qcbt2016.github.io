$(function() {

	// global CARD object
	var CARD = (function($) {

		var names = ['Elon Musk', 'Sheryl Sandberg', 'Bill Gates', 'Michelle Romanow', 'Arlene Dickinson', 'Steve Jobs', 'Mark Zuckerberg'];
		var orientation = undefined;
		var name = undefined;

		function returnNameAndOrientation() {
			// name
			name = Math.floor((Math.random() * names.length) + 0);
			// orientation
			orientation = Math.floor((Math.random() * 3) + 0);
			// decode orientation
			switch (orientation) {
				case 0: orientation = 'straight'; break;
				case 1: orientation = 'slant--right'; break;
				case 2: orientation = 'slant--left'; break;
			}
			// return 
			return { name : name , orientation : orientation };
		}

		function displayCard(nameOrienation) {
			$('.qcbt__widget__card__landing')
				.append('<article class="qcbt__widget__card__card qcbt__widget__card__card--current qcbt__widget__card__card--' + nameOrienation.orientation + '--in"><p class="qcbt__widget__card__card__header">Challenge The Ordinary. Be The Next</p><span class="qcbt__widget__card__card__table"><h5 class="qcbt__widget__card__card__name">' + names[nameOrienation.name] + '</h5></span></article>')
		}

		function removeCard() {
			// remove classes
			$('.qcbt__widget__card__card--current')
				.addClass('qcbt__widget__card__card--invisible');
			console.log(orientation);
			// add class
			switch (orientation) {
				case 'straight':
					$('.qcbt__widget__card__card--invisible')
						.addClass('qcbt__widget__card__card--straight--out');
				break;
				case 'slant--right':
					$('.qcbt__widget__card__card--invisible')
						.addClass('qcbt__widget__card__card--slant--right--out');
				break;
				case 'slant--left':
					$('.qcbt__widget__card__card--invisible')
						.addClass('qcbt__widget__card__card--slant--left--out');
				break;
			}
			// remove from screen
			setTimeout(function() {
				$('.qcbt__widget__card__card--invisible').remove();
			}, 300);
		}

		// initialize list
		displayCard(returnNameAndOrientation());


 		// poll through list
		setInterval(function() {
			// remove card
			removeCard();
			// add card
			setTimeout(function() {
				displayCard(returnNameAndOrientation());
			}, 500);
		}, 4500);

	})(jQuery);

});