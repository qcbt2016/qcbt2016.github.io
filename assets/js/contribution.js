$(function() {

	// global CONTRIBUTION object
	var CONTRIBUTION = (function($) {

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

	})(jQuery);

});