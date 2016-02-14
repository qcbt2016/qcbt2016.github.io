$(function() {

	// global QCBT object
	var QCBT = (function($) {

		var $body = document.getElementsByTagName('body')[0];
		var $landing = document.getElementById('landing');
		var $landingHeader = document.getElementById('landing-header');
		var $landingFooter = document.getElementById('landing-footer');
		var $landingCenter = document.getElementById('landing-center');
		
		$(window).scroll(function() {
			if ($(window).scrollTop() >= 100) {
				$('.qcbt__navigation').addClass('qcbt__navigation--visible');
				$('.qcbt__navigation__links__container').addClass('qcbt__navigation__links__container--visible');
			} else {
				$('.qcbt__navigation').removeClass('qcbt__navigation--visible');
				$('.qcbt__navigation__links__container').removeClass('qcbt__navigation__links__container--visible');
			}
		})

		var names = ['Elon Musk', 'Larry Ellison', 'Jeff Weiner', 'Michelle Romanow', 'Satya Nadella', 'Steve Jobs', 'Mark Zuckerberg', 'Sundar Pichai'];
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
				.append('<article class="qcbt__widget__card__card qcbt__widget__card__card--current qcbt__widget__card__card--' + nameOrienation.orientation + '--in"><p class="qcbt__widget__card__card__header">Be The Next</p><span class="qcbt__widget__card__card__table"><h5 class="qcbt__widget__card__card__name">' + names[nameOrienation.name] + '</h5></span></article>')
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


		$('.page__container').css('padding-top', $('.header__container').outerHeight());

		$('#contribution').on('input', function(e) {
			// remove previous styling
			$('.qcbt__contribution')
				.removeClass('qcbt__contribution--base qcbt__contribution--bronze qcbt__contribution--silver qcbt__contribution--gold qcbt__contribution--platinum')

			var value = parseInt($(e.currentTarget).val());
			// show value
			$('.qcbt__contribution__value__number').text(value + ((value == 8000) ? '+' : ''));
			// above 0
			if (value >= 0 && value < 1500) {
				$('.qcbt__contribution').addClass('qcbt__contribution--base');
			} else if (value >= 1500 && value < 3000) {
				$('.qcbt__contribution').addClass('qcbt__contribution--bronze');
			} else if (value >= 3000 && value < 5000) {
				$('.qcbt__contribution').addClass('qcbt__contribution--silver');
			} else if (value >= 5000 && value < 8000) {
				$('.qcbt__contribution').addClass('qcbt__contribution--gold');
			} else {
				$('.qcbt__contribution').addClass('qcbt__contribution--platinum');
			}

		});

		var i = 0;
		var drag = false;


		$('.qcbt__widget__team__member__avatar').click(function(e) {
			// prevent the default action
			e.preventDefault();
			// if dragged
			if (drag)
				return false;

			// get attributes
			var image 		= $(e.currentTarget).attr('data-image');
			var name 		= $(e.currentTarget).attr('data-name');
			var position 	= $(e.currentTarget).attr('data-position');
			var description = $(e.currentTarget).attr('data-description');
			var linkedin 	= $(e.currentTarget).attr('data-linkedin');

			$('.qcbt__modal').removeClass('qcbt__modal--hidden');
			// add card
			displayMemberCard(image, name, position, description, linkedin);
		});

		$('.qcbt__modal').click(function(e) {
			$('.qcbt__modal').addClass('qcbt__modal--hidden');
			// remove card
			removeMemberCard();
		});

		$('body').on('click', '.qcbt__member__card__cancel', function(e) {
			e.preventDefault();

			$('.qcbt__modal').addClass('qcbt__modal--hidden');
			// remove card
			removeMemberCard();
		})

		function displayMemberCard(image, name, position, description, linkedin) {
			$('body').append('<article class="qcbt__member__card qcbt__member__card--in"><div class="qcbt__member__card__frame"><span class="qcbt__member__card__profile"><div class="qcbt__member__card__image__container"><img class="qcbt__member__card__image" src="../assets/images/avatars/' + image + '.jpg"></div><p class="qcbt__member__card__name">' + name + '</p><p class="qcbt__member__card__position">' + position + '</p></span><p class="qcbt__member__card__description">' + description + '</p><span class="qcbt__member__card__buttons cf"><a href="' + linkedin + '" target="blank" class="qcbt__member__card__linkedin">LinkedIn</a><a class="qcbt__member__card__cancel">Cancel</a></span></div></article>');
		}

		function removeMemberCard() {
			$('.qcbt__member__card').addClass('qcbt__member__card--out');
			// remove from page
			setTimeout(function() {
				$('.qcbt__member__card').remove();
			}, 300);
		}

		dragID = undefined;

		$('.ui-draggable').draggable({
			start: function(e, u) {
				dragID = e.currentTarget.id;
				drag = true;
				//elementSpringStop('#' + e.target.id);
			},
			stop: function(e, u) {
				elementSpringTo('#' + dragID, 0, 0, [120, 10, 3], 0, 0, 0);
				drag = false;
			}
		});

	})(jQuery);

});
