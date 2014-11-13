/*
 *  jQuery onRead - v0.1
 *  An educated guess to discover whether a given element was read by the user
 *  https://github.com/PedroSena/jquery-onread
 *
 *  Made by Pedro Sena
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {

	"use strict";

	/**
	* The variables wordsPerSecond and averageWordSize 
	* I got from http://www.forbes.com/sites/brettnelson/2012/06/04/do-you-read-fast-enough-to-be-successful/
	* and made some small adjustments.
	*/
	var intervalFrequency = 100,
		wordsPerSecond = 4,
		averageWordSize = 6;

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
			var lastTimeVisible = $.data(element, "lastTimeVisible"),
				timeRequired = null;
			if ( ! lastTimeVisible ) {
				$.data(element, "lastTimeVisible", now());
			} else {
				timeRequired = $.data(element, "timeRequired");
				if ( lastTimeVisible + timeRequired <= now() ) {
					$(element).trigger("read");
					window.clearInterval($.data(element, "checkerId"));
				}
			}
		} else {
			$.removeData(element, "lastTimeVisible");
		}
	}

	$.fn.readable = function(options) {
		return this.each(function() {
			var element = $(this)[0],
				timeRequired = options.timeRequired || timeRequiredForReading(element),
				handler = function(){
					fireEventIfVisibleForLongEnough(element);
				},
				checkerId = setInterval(handler,intervalFrequency);
			$.data(element, "checkerId", checkerId);
			$.data(element, "timeRequired", timeRequired);
		});
	};

})( jQuery, window, document );
