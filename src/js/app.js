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

		dom.socialToggle = document.getElementById('socialToggle');
		dom.socialHeader = document.getElementById('socialHeader');

	};

	var addEventHandlers = function() {

		dom.socialToggle.addEventListener('click', toggleConnectShare, false);

	};

	var toggleConnectShare = function(e) {

		dom.socialHeader.classList.toggle('is-expanded');

	};

	var injectSocialJs = function() {

		// Wait 1s to inject so css animations don't get janky.
		window.setTimeout(function() {

			// Load facebook js.
			!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

			// Load twitter js.
			(function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id;
			  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
			  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));

		}, 1500);

	};

	var init = function() {

		setupScrollWatch();
		setupDom();
		addEventHandlers();
		injectSocialJs();

	};

	init();

})();
