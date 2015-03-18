(function() {

	var unHide = function(el) {

		el.classList.remove('hidden');

	};

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

})();
