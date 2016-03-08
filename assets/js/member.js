$(function() {

	// global MEMBER object
	var MEMBER = (function($) {

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