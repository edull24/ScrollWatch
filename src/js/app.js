(function() {

	var dom = {};

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

		// Flip feature cards.
		new window.ScrollWatch({
			watch: '.feature-list__item',
			onElementInView: function(data) {
				unHide(data.el);
				data.el.classList.add('flipInX');
			}
		});

		// Header tagline.
		new window.ScrollWatch({
			watch: '.site-header__tagline',
			onElementInView: function(data) {
				unHide(data.el);
				data.el.classList.add('rubberBand');
			}
		});

	};

	var setupDom = function() {

		dom.connectShareBtn = document.querySelector('.site-header__connect-share-btn');
		dom.socialHeader = document.getElementById('socialHeader');

	};

	var addEventHandlers = function() {

		dom.connectShareBtn.addEventListener('click', toggleConnectShare, false);

	};

	var toggleConnectShare = function(e) {

		dom.socialHeader.classList.toggle('is-expanded');

	};

	var init = function() {

		setupScrollWatch();
		setupDom();
		addEventHandlers();

	};

	init();

})();
