'use strict';

// Give each instance on the page a unique ID.
var instanceId = 0;

// Store instance data privately so it can't be accessed/modified.
var instanceData = {};

var ignoreClass = 'scroll-watch-ignore';

var config = {
	// The default container is window, but we need the actual
	// documentElement to determine positioning.
	container: window.document.documentElement,
	watch: '[data-scroll-watch]',
	watchOnce: true,
	inViewClass: 'scroll-watch-in-view',
	scrollDebounce: 200,
	resizeDebounce: 500,
	watchOffset: 0,
	infiniteScroll: false,
	infiniteOffset: 0,
	onElementInView: function(){},
	onElementOutOfView: function(){},
	onInfiniteXInView: function(){},
	onInfiniteYInView: function(){}
};

var initEvent = 'scrollwatchinit';

var extend = function(retObj) {

	var len = arguments.length;
	var i;
	var key;
	var obj;

	retObj = retObj || {};

	for (i = 1; i < len; i++) {

		obj = arguments[i];

		if (!obj) {

			continue;

		}

		for (key in obj) {

			if (obj.hasOwnProperty(key)) {

				retObj[key] = obj[key];

			}

		}
	}

	return retObj;

};

// Get the scrolling container element to watch if it's not the default window/documentElement.
var saveContainerElement = function() {

	if (!isContainerWindow.call(this)) {

		instanceData[this._id].config.container = document.querySelector(instanceData[this._id].config.container);

	}

};

// Save all elements to watch into an array.
var saveElements = function() {

	instanceData[this._id].elements = Array.prototype.slice.call(document.querySelectorAll(instanceData[this._id].config.watch + ':not(.' + ignoreClass + ')'));

};

// Save the scroll position of the scrolling container so we can
// perform comparison checks.
var saveScrollPosition = function() {

	instanceData[this._id].lastScrollPosition = getScrollPosition.call(this);

};

var checkViewport = function(eventType) {

	checkElements.call(this, eventType);
	checkInfinite.call(this, eventType);
	saveScrollPosition.call(this);

};

// Determine if the watched elements are viewable within the
// scrolling container.
var checkElements = function(eventType) {

	var data = instanceData[this._id];
	var len = data.elements.length;
	var config = data.config;
	var inViewClass = config.inViewClass;
	var responseData = {
		eventType: eventType
	};
	var el;
	var i;

	for (i = 0; i < len; i++) {

		el = data.elements[i];

		// Prepare the data to pass to the callback.
		responseData.el = el;

		if (eventType === 'scroll') {

			responseData.direction = getScrolledDirection.call(this, getScrolledAxis.call(this));

		}

		if (isElementInView.call(this, el)) {

			if (!el.classList.contains(inViewClass)) {

				// Add a class hook and fire a callback for every
				// element that just came into view.

				el.classList.add(inViewClass);
				config.onElementInView.call(this, responseData);

				if (config.watchOnce) {

					// Remove this element so we don't check it again
					// next time.

					data.elements.splice(i, 1);
					len--;
					i--;

					// Flag this element with the ignore class so we
					// don't store it again if a refresh happens.

					el.classList.add(ignoreClass);

				}

			}

		} else {

			if (el.classList.contains(inViewClass)) {

				// Remove the class hook and fire a callback for every
				// element that just went out of view.

				el.classList.remove(inViewClass);
				config.onElementOutOfView.call(this, responseData);

			}

		}

	}

};

// Determine if the infinite scroll zone is in view. This could come into
// view by scrolling or resizing. Initial load must also be accounted
// for.
var checkInfinite = function(eventType) {

	var data = instanceData[this._id];
	var config = data.config;
	var i;
	var axis;
	var container;
	var viewableRange;
	var scrollSize;
	var callback;
	var responseData;

	if (config.infiniteScroll && !data.isInfiniteScrollPaused) {

		axis = ['x', 'y'];
		callback = ['onInfiniteXInView', 'onInfiniteYInView'];
		container = config.container;
		viewableRange = getViewableRange.call(this);
		scrollSize = [container.scrollWidth, container.scrollHeight];
		responseData = {};

		for (i = 0; i < 2; i++) {

			// If a scroll event triggered this check, verify the scroll
			// position actually changed for each axis. This stops
			// horizontal scrolls from triggering infiniteY callbacks
			// and vice versa. In other words, only trigger an infinite
			// callback if that axis was actually scrolled.

			if ((eventType === 'scroll' && hasScrollPositionChanged.call(this, axis[i]) || eventType === 'resize'|| eventType === 'refresh' || eventType === initEvent) && viewableRange[axis[i]].end + config.infiniteOffset >= scrollSize[i]) {

				// We've scrolled/resized all the way to the right/bottom.

				responseData.eventType = eventType;

				if (eventType === 'scroll') {

					responseData.direction = getScrolledDirection.call(this, axis[i]);

				}

				config[callback[i]].call(this, responseData);

			}

		}

	}

};

var clearDebounceTimer = function() {

	clearTimeout(instanceData[this._id].debounceTimer);

};

// Add listeners to the scrolling container for each instance.
var addListeners = function() {

	var scrollingElement = getScrollingElement.call(this);

	scrollingElement.addEventListener('scroll', instanceData[this._id].handler, false);
	scrollingElement.addEventListener('resize', instanceData[this._id].handler, false);

};

var removeListeners = function() {

	var scrollingElement = getScrollingElement.call(this);

	scrollingElement.removeEventListener('scroll', instanceData[this._id].handler);
	scrollingElement.removeEventListener('resize', instanceData[this._id].handler);

};

var getScrollingElement = function() {

	return isContainerWindow.call(this) ? window : instanceData[this._id].config.container;

};

// Get the width and height of viewport/scrolling container.
var getViewportSize = function() {

	var size = {
			w: instanceData[this._id].config.container.clientWidth,
			h: instanceData[this._id].config.container.clientHeight
		};

	return size;

};

// Get the scrollbar position of the scrolling container.
var getScrollPosition = function() {

	var pos = {
			left: 0,
			top: 0
		};
	var container;

	if (isContainerWindow.call(this)) {

		pos.left = window.pageXOffset;
		pos.top = window.pageYOffset;


	} else {

		container = instanceData[this._id].config.container;

		pos.left = container.scrollLeft;
		pos.top = container.scrollTop;

	}

	return pos;

};

// Get the pixel range currently viewable within the
// scrolling container.
var getViewableRange = function() {

	var range = {
			x: {},
			y: {}
		};
	var scrollPos = getScrollPosition.call(this);
	var viewportSize = getViewportSize.call(this);

	range.x.start = scrollPos.left;
	range.x.end =  range.x.start + viewportSize.w;
	range.x.size = range.x.end - range.x.start;

	range.y.start = scrollPos.top;
	range.y.end = range.y.start + viewportSize.h;
	range.y.size = range.y.end - range.y.start;

	return range;

};

// Get the pixel range of where this element falls within the
// scrolling container.
var getElementRange = function(el) {

	var range = {
			x: {},
			y: {}
		};
	var viewableRange = getViewableRange.call(this);
	var coords = el.getBoundingClientRect();
	var containerCoords;

	if (isContainerWindow.call(this)) {

		range.x.start = coords.left + viewableRange.x.start;
		range.x.end = coords.right + viewableRange.x.start;


		range.y.start = coords.top + viewableRange.y.start;
		range.y.end = coords.bottom + viewableRange.y.start;

	} else {

		containerCoords = instanceData[this._id].config.container.getBoundingClientRect();

		range.x.start = (coords.left - containerCoords.left) + viewableRange.x.start;
		range.x.end = range.x.start + coords.width;

		range.y.start = (coords.top - containerCoords.top) + viewableRange.y.start;
		range.y.end = range.y.start + coords.height;

	}

	range.x.size = range.x.end - range.x.start;
	range.y.size = range.y.end - range.y.start;

	return range;

};

// Determines which axis was just scrolled (x/horizontal or y/vertical).
var getScrolledAxis = function() {

	if (hasScrollPositionChanged.call(this, 'x')) {

		return 'x';

	}

	if (hasScrollPositionChanged.call(this, 'y')) {

		return 'y';

	}

};

var getScrolledDirection = function(axis) {

	var scrollDir = {x: ['right', 'left'], y: ['down', 'up']};
	var position = {x: 'left', y: 'top'};
	var lastScrollPosition = instanceData[this._id].lastScrollPosition;
	var curScrollPosition = getScrollPosition.call(this);

	return curScrollPosition[position[axis]] > lastScrollPosition[position[axis]] ? scrollDir[axis][0] : scrollDir[axis][1];

};

var hasScrollPositionChanged = function(axis) {

	var position = {x: 'left', y: 'top'};
	var lastScrollPosition = instanceData[this._id].lastScrollPosition;
	var curScrollPosition = getScrollPosition.call(this);

	return curScrollPosition[position[axis]] !== lastScrollPosition[position[axis]];

};

var isElementInView = function(el) {

	var viewableRange = getViewableRange.call(this);
	var elRange = getElementRange.call(this, el);
	var offset = instanceData[this._id].config.watchOffset;

	return isElementInVerticalView(elRange, viewableRange, offset) && isElementInHorizontalView(elRange, viewableRange, offset);

};

var isElementInVerticalView = function(elRange, viewableRange, offset) {

	return elRange.y.start < viewableRange.y.end + offset && elRange.y.end > viewableRange.y.start - offset;

};

var isElementInHorizontalView = function(elRange, viewableRange, offset) {

	return elRange.x.start < viewableRange.x.end + offset && elRange.x.end > viewableRange.x.start - offset;

};

var isContainerWindow = function() {

	return instanceData[this._id].config.container === window.document.documentElement;

};

var mergeOptions = function(opts) {

	extend(instanceData[this._id].config, config, opts);

};

var ScrollWatch = function(opts) {

	Object.defineProperty(this, '_id', {value: instanceId++});

	// Keep all instance data private, except for the '_id', which will
	// be the key to get the private data for a specific instance.

	instanceData[this._id] = {

		config: {},
		elements: [],
		lastScrollPosition: {},
		debounceTimer: null,
		isInfiniteScrollPaused: false,

		// In order to remove listeners later and keep a correct reference
		// to 'this', give each instance it's own event handler.
		handler: function(e) {

			var data = instanceData[this._id],
				config = data.config,
				eventType = e.type,
				debounce = eventType === 'scroll' ? config.scrollDebounce : config.resizeDebounce;

			clearDebounceTimer.call(this);

			data.debounceTimer = setTimeout(function() {

				checkViewport.call(this, eventType);

			// Bind the instance to the function.
			}.bind(this), debounce);

		// Bind the instance to the method.
		}.bind(this)

	};

	mergeOptions.call(this, opts);
	saveContainerElement.call(this);
	addListeners.call(this);
	saveElements.call(this);
	saveScrollPosition.call(this);
	checkElements.call(this, initEvent);
	checkInfinite.call(this, initEvent);

};

ScrollWatch.prototype = {

	// Should be manually called by user after loading in new content.
	refresh: function() {

		saveElements.call(this);
		checkViewport.call(this, 'refresh');

	},

	destroy: function() {

		removeListeners.call(this);
		clearDebounceTimer.call(this);
		delete instanceData[this._id];

	},

	pauseInfiniteScroll: function() {

		instanceData[this._id].isInfiniteScrollPaused = true;

	},

	resumeInfiniteScroll: function() {

		instanceData[this._id].isInfiniteScrollPaused = false;

	}

};
