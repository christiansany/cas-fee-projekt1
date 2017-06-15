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
