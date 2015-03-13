// (function() {

	/*var swHeaderTitle = new window.ScrollWatch({
		watch: '.site-header-title',
		onElementInView: function(data) {
			data.el.classList.add('animated', 'lightSpeedIn');
		}
	});*/

	var swDefault = new window.ScrollWatch({
		watch: '.sw-fadeInUp',
		onElementInView: function(data) {
			data.el.style.visibility = 'visible';
			data.el.classList.add('fadeInUp');
		}
	});

	var swDefault = new window.ScrollWatch({
		watch: '.features-list-item',
		onElementInView: function(data) {
			data.el.classList.remove('hidden');
			data.el.classList.add('flipInX');
		}
	});

// })();
