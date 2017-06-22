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
export default () => {

    let uid = -1,
        events = {},

        /**
         * Subscribes to an Event.
         *
         * @param {string} event - Name of the event.
         * @param {function} listener - Callback function.
         * @param {boolean} once - If true, removes a listener after first execution
         * @returns {number} Returns an id for this subscription.
         */
        on = (event, listener, once) => {
            uid++;

            once = once || false;

            if (!events[event]) {
                events[event] = {queue: []};
            }

            events[event].queue.push({
                uid,
                listener,
                once
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
        off = (event) => {
            if (typeof event === 'number') {
                for (let e in events) {
                    if (events.hasOwnProperty(e)) {
                        for (let i = events[e].queue.length; i--;) {
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
        trigger = function(event) {
            if (!events[event] || !events[event].queue.length) {
                return;
            }

            const data = [...arguments].slice(1);

            // Create copy, in case the queue gets mutated inside a callback
            const eventQueue = events[event].queue.slice(0);

            // Cycle through topics queue, fire!
            eventQueue.forEach(function(item) {
                item.listener(...data); // ES5 compliant: item.listener.apply(null, data);
                if (item.once) {

                    // Unsubscribe
                    off(item.uid);
                }
            });
        };

    return {
        on,
        off,
        trigger
    };
};
