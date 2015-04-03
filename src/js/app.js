(function() {

	'use strict';

	var matches = function(el, selector) {

		return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);

	};

	var getClosest = function(element, selector) {

		for (; element && element !== document; element = element.parentNode) {

			if (matches(element, selector)) {

				return element;
			}

		}

		return false;

	};

	// var whichTransitionEvent = function(){
	// 	var t;
	// 	var el = document.createElement('fakeelement');
	// 	var transitions = {
	// 		'transition': 'transitionend',
	// 		'OTransition': 'oTransitionEnd',
	// 		'MozTransition': 'transitionend',
	// 		'WebkitTransition': 'webkitTransitionEnd'
	// 	};

	// 	for(t in transitions){
	// 		if( el.style[t] !== undefined ){
	// 			return transitions[t];
	// 		}
	// 	}
	// };

	var getAnimationEndEventName = function(){
		var t;
		var el = document.createElement('fakeelement');
		var transitions = {
			'animation': 'animationend',
			'OAnimation': 'oAnimationEnd',
			'MozAnimation': 'animationend',
			'WebkitAnimation': 'webkitAnimationEnd'
		};

		for(t in transitions){
			if( el.style[t] !== undefined ){
				return transitions[t];
			}
		}
	};

	var unHide = function(el) {

		el.classList.remove('hidden');

	};

	var setupScrollWatch = function() {

		// Elements to fadeInUP.
		new window.ScrollWatch({
			watch: '.sw-fadeInUp',
			onElementInView: function(data) {
				data.el.classList.remove('sw-fadeInUp');
				data.el.classList.add('fadeInUp');
			}
		});

		// Elements to fadeIn.
		new window.ScrollWatch({
			watch: '.sw-fadeIn',
			onElementInView: function(data) {
				data.el.classList.remove('sw-fadeIn');
				data.el.classList.add('fadeIn');
			}
		});

		// Feature cards.
		new window.ScrollWatch({
			watch: '.feature-list__item',
			onElementInView: function(data) {
				unHide(data.el);
				data.el.classList.add('pulse');
			}
		});

	};

	var init = function() {

		var logoLetterIcon = document.getElementById('logo__letter--icon');

		setupScrollWatch();

		logoLetterIcon.addEventListener(getAnimationEndEventName(), function() {

			// Search animation has ended. Change font size to trigger the
			// transition. Must use transition b/c mobile safari blows up
			// when animating font size with ems.

			logoLetterIcon.style.fontSize = '1em';

		});

		document.addEventListener('click', function(e) {

			var target = e.target;
			var btn;
			var btnWrapper;

			// console.log(target);

			if (matches(target, '.social-btns__icon > .sw-icon--btn')) {

				btn = getClosest(target, '.social-btns__btn');
				btnWrapper = getClosest(target, '.social-btns');

				btnWrapper.classList.toggle('has-selected');
				btn.classList.toggle('is-selected');

			}

		}, false);

	};

	init();

})();
