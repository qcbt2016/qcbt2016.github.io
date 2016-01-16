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

		//$('#landing').height(window.innerHeight);
		//$('#landing-center').height(window.innerHeight - $('#landing-header').height() - $('.landing__foot').height())

		// $('.landing__action').mouseenter(function() {
		// 	currentFrame = 0;
		// 	draw();
		// });

		// $('.landing__href').click(function(e) {
		// 	var tar = e.target.href.split('/')[e.target.href.split('/').length - 1];
		// 	e.preventDefault();
		// 	$('html, body').animate({
		// 		scrollTop: $(tar).offset().top
		// 	}, 200);
		// });
		
		// // svg rendering
		// var currentFrame = 0;
		// var totalFrames = 30;
		// var path = new Array();
		// var length = new Array;
		
		// for ( var i = 0; i < 8; i++ ) {
		// 	path[i] = document.getElementById('Path-' + i);
		// 	l = path[i].getTotalLength();
		// 	length[i] = l;
		// 	path[i].style.strokeDasharray = l + ' ' + l;
		// 	path[i].style.strokeDashoffset = 1;
		// }
		
		// var handle = 0;
		
		// var draw = function() {
		// 	var progress = currentFrame / totalFrames;
		// 	if ( progress > 1 ) {
		// 		window.cancelAnimationFrame(handle);
		// 	} else {
		// 		currentFrame++;
		// 		for ( var j = 0; j < path.length; j++ ) {
		// 		// 1 - progress goes forwards 1 + progress goes backwards
		// 			path[j].style.strokeDashoffset = Math.floor(length[j] * (1 - progress));
		// 		}
		// 		handle = window.requestAnimationFrame(draw);
		// 	}
		// }

		// Noun Switcher
		// var height = 96;
		// var width = 0;
		// var margin = 0;
		// var numOfElements = $('.landing__theme__noun').length;

		// /// poll through list
		// setInterval(function() {
		// 	// check if at the end of the list or not
		// 	if ($('[data-noun-state="visible"]').index() == (numOfElements - 1)) {
		// 		// get new width
		// 		width = $('[data-noun-state]:nth-of-type(1)').innerWidth();
		// 		// margin
		// 		margin = 0;
		// 		// adjust visble on deck and hidden
		// 		$('[data-noun-state]').attr('data-noun-state', 'hidden');
		// 		$('[data-noun-state]:nth-of-type(1)').attr('data-noun-state', 'visible');
		// 		$('[data-noun-state]:nth-of-type(2)').attr('data-noun-state', 'ondeck');
		// 	} else {
		// 		// get new width
		// 		width = $('[data-noun-state="ondeck"]').innerWidth();
		// 		// margin
		// 		margin += 96;
		// 		// adjust visble on deck and hidden
		// 		$('[data-noun-state="ondeck"]')
		// 			.attr('data-noun-state', 'visible')
		// 			.prev()
		// 				.attr('data-noun-state', 'hidden')
		// 					.end()
		// 			.next()
		// 				.attr('data-noun-state', 'ondeck');
		// 	}
		// 	// set width and margin
		// 	$('.landing__theme__noun__switcher').width(width);
		// 	$('.landing__theme__nouns').css('-webkit-transform', 'translateY(-' + margin + 'px)');
		// }, 4000);

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
				.html('<article class="qcbt__widget__card__card qcbt__widget__card__card--current qcbt__widget__card__card--' + nameOrienation.orientation + '--in"><p class="qcbt__widget__card__card__header">Challenge The Ordinary. Be The Next</p><span class="qcbt__widget__card__card__table"><h5 class="qcbt__widget__card__card__name">' + names[nameOrienation.name] + '</h5></span></article>')
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

		// // using the history API
		// $('.landing__href').click(function(e) {
		// 	e.preventDefault();
		// 	// pushState
		// 	window.history.pushState(null, 'Title', $(e.currentTarget).attr('href'));
		// 	//$('.dick').load($(e.currentTarget).attr('href'))
		// });


		//alert($(window).width())


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



		
		// elementSpringTo('#mem-avatar-2', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-3', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-4', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-5', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-6', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-7', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-8', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-9', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-10', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-11', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-12', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-13', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-14', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-15', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-16', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-17', 0, 0, [120, 10, 3], 0, 0, 0);
		// elementSpringTo('#mem-avatar-18', 0, 0, [120, 10, 3], 0, 0, 0);

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

//		elementSpringTo('.qcbt__widget__team__member__avatar', 0, 0, [120, 10, 3], 0, 0, 0);
		//elementSpringTo('.qcbt__widget__card__card', 0, 0, [120, 10, 3], 0, 0, 0);
		
		// window.setInterval(function() {
		// 	//for (var i = 0; i < 75; i++)
		// 	if (i == 75)
		// 		return false;
		// 	else
		// 		$('#num').text(i)

		// 	i++;
		// }, 10);

		


	})(jQuery);

});