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

	var intervalFrequency = 100;

	function isRectVisible(rect){
		return rect.top >= 0 && rect.left >= 0 && rect.bottom <= $(window).height() && rect.right <= $(window).width();
	}

	function timeRequiredForReading(element) {
		console.log(element);
		//TODO Implement
		return 5000;
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
