$(function() {

	// global QCBT object
	var QCBT = (function($) {

		var $body = document.getElementsByTagName('body')[0];
		var $landing = document.getElementById('landing');
		var $landingHeader = document.getElementById('landing-header');
		var $landingFooter = document.getElementById('landing-footer');
		var $landingCenter = document.getElementById('landing-center');
		
		//$('#landing').height(window.innerHeight);
		//$('#landing-center').height(window.innerHeight - $('#landing-header').height() - $('.landing__foot').height())

		$('.landing__action').mouseenter(function() {
			currentFrame = 0;
			draw();
		});

		$('.landing__href').click(function(e) {
			var tar = e.target.href.split('/')[e.target.href.split('/').length - 1];
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $(tar).offset().top
			}, 200);
		});
		
		// svg rendering
		var currentFrame = 0;
		var totalFrames = 30;
		var path = new Array();
		var length = new Array;
		
		for ( var i = 0; i < 8; i++ ) {
			path[i] = document.getElementById('Path-' + i);
			l = path[i].getTotalLength();
			length[i] = l;
			path[i].style.strokeDasharray = l + ' ' + l;
			path[i].style.strokeDashoffset = 1;
		}
		
		var handle = 0;
		
		var draw = function() {
			var progress = currentFrame / totalFrames;
			if ( progress > 1 ) {
				window.cancelAnimationFrame(handle);
			} else {
				currentFrame++;
				for ( var j = 0; j < path.length; j++ ) {
				// 1 - progress goes forwards 1 + progress goes backwards
					path[j].style.strokeDashoffset = Math.floor(length[j] * (1 - progress));
				}
				handle = window.requestAnimationFrame(draw);
			}
		}

		// Noun Switcher
		var height = 96;
		var width = 0;
		var margin = 0;
		var numOfElements = $('.landing__theme__noun').length;

		/// poll through list
		setInterval(function() {
			// check if at the end of the list or not
			if ($('[data-noun-state="visible"]').index() == (numOfElements - 1)) {
				// get new width
				width = $('[data-noun-state]:nth-of-type(1)').innerWidth();
				// margin
				margin = 0;
				// adjust visble on deck and hidden
				$('[data-noun-state]').attr('data-noun-state', 'hidden');
				$('[data-noun-state]:nth-of-type(1)').attr('data-noun-state', 'visible');
				$('[data-noun-state]:nth-of-type(2)').attr('data-noun-state', 'ondeck');
			} else {
				// get new width
				width = $('[data-noun-state="ondeck"]').innerWidth();
				// margin
				margin += 96;
				// adjust visble on deck and hidden
				$('[data-noun-state="ondeck"]')
					.attr('data-noun-state', 'visible')
					.prev()
						.attr('data-noun-state', 'hidden')
							.end()
					.next()
						.attr('data-noun-state', 'ondeck');
			}
			// set width and margin
			$('.landing__theme__noun__switcher').width(width);
			$('.landing__theme__nouns').css('-webkit-transform', 'translateY(-' + margin + 'px)');
		}, 4000);

		// using the history API
		$('.landing__href').click(function(e) {
			e.preventDefault();
			// pushState
			window.history.pushState(null, 'Title', $(e.currentTarget).attr('href'));
			//$('.dick').load($(e.currentTarget).attr('href'))
		});



	})(jQuery);

});