// (function() {

	var swDefault = new window.ScrollWatch({
		watch: '.sw-fadeInUp',
		onElementInView: function(data) {
			// console.log(data);
			data.el.classList.remove('sw-fadeInUp');
			data.el.classList.add('fadeInUp');
		}
	});

	var swDefault = new window.ScrollWatch({
		watch: '.features-list-item',
		onElementInView: function(data) {
			console.log(data);
			data.el.classList.remove('hidden');
			data.el.classList.add('flipInX');
		}
	});

// })();
