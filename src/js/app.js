// (function() {

	var swHeaderTitle = new window.ScrollWatch({
		watch: '.header-title',
		onElementInView: function(data) {
			data.el.classList.add('animated', 'lightSpeedIn');
		}
	});

	var swDefault = new window.ScrollWatch({
		watch: '.hidden',
		onElementInView: function(data) {
			data.el.classList.remove('hidden');
			data.el.classList.add('animated', 'fadeInUp');
		}
	});

// })();
