import observer from '../libs/observer';

/**
 * Filter Factory
 *
 * @param {Element} trigger as factory root element
 * @return {Object} instance
 */
export const createFilter = trigger => {
    const instance = Object.assign({}, observer()); // Object composition
    const state = {
        showFinished: false
    };

    instance.setFilter = activeFilter => {
        state.showFinished = activeFilter;

        // Set the checkbox to the correct state, in case the filter was changed from outside of the module
        trigger.checked = state.showFinished;

        // Notify all subscribers
        instance.trigger('changed', state.showFinished);
    };

    const clickHandler = e => {
        instance.setFilter(e.target.checked);
    };

    trigger.addEventListener('change', clickHandler);

    // Expose state.showFinished
    instance.showFinished = () => state.showFinished;

    // Some serious exposing happens here
    return instance;
};
