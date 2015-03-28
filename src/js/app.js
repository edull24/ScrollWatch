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

	var injectSocialJs = function() {

		// Wait 1s to inject so css animations don't get janky.
		window.setTimeout(function() {

			/*(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-60956379-1', 'auto');
			ga('send', 'pageview');*/

		}, 1500);

	};

	var init = function() {

		setupScrollWatch();
		injectSocialJs();

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
