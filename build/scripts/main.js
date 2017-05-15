/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	var _pubsub = __webpack_require__(5);
	
	var _pubsub2 = _interopRequireDefault(_pubsub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	// https://developer.mozilla.org/de/docs/Web/API/Element/matches
	
	if (!Element.prototype.matches) {
	    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
	        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
	            i = matches.length;
	        while (--i >= 0 && matches.item(i) !== this) {
	            // Empty statement
	        }
	        return i > -1;
	    };
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	if (window.Element && !Element.prototype.closest) {
	    Element.prototype.closest = function (selector) {
	        var element = this;
	
	        while (element && element.nodeType === 1) {
	            if (element.matches(selector)) {
	                return element;
	            }
	
	            element = element.parentNode;
	        }
	
	        return null;
	    };
	} // https://developer.mozilla.org/de/docs/Web/API/Element/closest
	
	// Dependencies

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	
	/**
	 * @file Polyfill for Nodelist.prototype.forEach
	 *
	 * Documentation:
	 * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
	 *
	 * @author Christian Sany <christian.sany@bluewin.ch>
	 *
	 * @param {function} callback will be called for each Element in the Nodelist
	 * @param {any} argument (optional) - Results as 'this' in the callback function - fallback is the window object
	 */
	if (window.NodeList && !NodeList.prototype.forEach) {
	    NodeList.prototype.forEach = function (callback, argument) {
	        argument = argument || window;
	        for (var i = 0; i < this.length; i++) {
	            callback.call(argument, this[i], i, this);
	        }
	    };
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _observer = __webpack_require__(6);
	
	var _observer2 = _interopRequireDefault(_observer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Exporting object
	exports.default = (0, _observer2.default)(); /**
	                                              * @file
	                                              * Pubsub
	                                              *
	                                              * Provides a globally accessable object with an observer pattern.
	                                              *
	                                              * @author christian.sany@notch-interactive.com
	                                              */
	
	// Dependencies

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
	 * This module implements an observer pattern.
	 * It can be used to extend the functionality of a module.
	 *
	 * @example
	 * import observer from 'composites/observer';
	 *
	 * export default () => {
	 *  let instance = {};
	 *  ...
	 *  ...
	 *  instance = Object.assign({}, instance, observer());
	 * }
	 *
	 * @author christian.sany@notch-interactive.com, diego.morales@notch-interactive.com
	 *
	 * @module composites/observer
	 */
	
	/**
	 * There's no need to pass the instance of the parent module to this composite.
	 * @static
	 * @function factory
	 * @returns {object} Observer instance
	 */
	exports.default = function () {
	
	    var uid = -1,
	        events = {},
	
	
	    /**
	     * Subscribes to an Event.
	     *
	     * @param {string} event - Name of the event.
	     * @param {function} listener - Callback function.
	     * @param {boolean} once - If true, removes a listener after first execution
	     * @returns {number} Returns an id for this subscription.
	     */
	    on = function on(event, listener, once) {
	        uid++;
	
	        once = once || false;
	
	        if (!events[event]) {
	            events[event] = { queue: [] };
	        }
	
	        events[event].queue.push({
	            uid: uid,
	            listener: listener,
	            once: once
	        });
	
	        return uid;
	    },
	
	
	    /**
	     * Unsubscribes an Event.
	     * If an event name is passed, all listeners to this event will be removed.
	     *
	     * @param {string|number} event - Can be id of subscription or event name.
	     * @returns {string|number} Returns the removed id or event name. -1 will be returned if nothing was removed.
	     */
	    off = function off(event) {
	        if (typeof event === 'number') {
	            for (var e in events) {
	                if (events.hasOwnProperty(e)) {
	                    for (var i = events[e].queue.length; i--;) {
	                        if (events[e].queue[i].uid === event) {
	                            events[e].queue.splice(i, 1);
	
	                            if (!events[e].queue.length) {
	                                delete events[e];
	                            }
	
	                            return event;
	                        }
	                    }
	                }
	            }
	        }
	
	        if (typeof event === 'string') {
	            delete events[event];
	            return event;
	        }
	
	        return -1;
	    },
	
	
	    /**
	     * Triggers all listeners of event.
	     *
	     * @param {string} event - Name of Event
	     * @param {object} data - Data which will be passed to listeners. Can actually also be string, number or array. The listener should simply be able to handle the passed data.
	     */
	    trigger = function trigger(event) {
	        if (!events[event] || !events[event].queue.length) {
	            return;
	        }
	
	        var data = [].concat(Array.prototype.slice.call(arguments)).slice(1);
	
	        // Create copy, in case the queue gets mutated inside a callback
	        var eventQueue = events[event].queue.slice(0);
	
	        // Cycle through topics queue, fire!
	        eventQueue.forEach(function (item) {
	            item.listener.apply(item, _toConsumableArray(data)); // ES5 compliant: item.listener.apply(null, data);
	            if (item.once) {
	
	                // Unsubscribe
	                off(item.uid);
	            }
	        });
	    };
	
	    return {
	        on: on,
	        off: off,
	        trigger: trigger
	    };
	};

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map