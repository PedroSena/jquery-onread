;(function ( $, window, document, undefined ) {

	"use strict";

	var intervalFrequency = 100;
	/**
	* The variables wordsPerSecond and averageWordSize 
	* I got from http://www.forbes.com/sites/brettnelson/2012/06/04/do-you-read-fast-enough-to-be-successful/
	* and made some small adjustments.
	*/
	var wordsPerSecond = 4;
	var averageWordSize = 6;

	function isRectVisible(rect){
		return rect.top >= 0 && rect.left >= 0 && 
			   rect.bottom <= $(window).height() && rect.right <= $(window).width();
	}

	function timeRequiredForReading(element) {
		var timeRequired = $(element).text().length / averageWordSize / wordsPerSecond;
		return timeRequired * 1000;
	}

	function now() {
		return new Date().getTime();
	}

	function fireEventIfVisibleForLongEnough(element) {
		if ( isRectVisible(element.getBoundingClientRect()) ) {
			var lastTimeVisible = $.data(element, "lastTimeVisible");
			if ( ! lastTimeVisible ) {
				$.data(element, "lastTimeVisible", now());
			} else {
				var timeRequired = $.data(element, "timeRequired");
				if ( lastTimeVisible + timeRequired <= now() ) {
					$(element).trigger("read");
					window.clearInterval($.data(element, "checkerId"));
				}
			}
		} else {
			$.removeData(element, "lastTimeVisible");
		}
	}

	$.fn.readable = function() {
		return this.each(function() {
			var element = $(this)[0],
				timeRequired = timeRequiredForReading(element),
				handler = function(){
					fireEventIfVisibleForLongEnough(element);
				},
				checkerId = setInterval(handler,intervalFrequency);
			$.data(element, "checkerId", checkerId);
			$.data(element, "timeRequired", timeRequired);
		});
	};

})( jQuery, window, document );
