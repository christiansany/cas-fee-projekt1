import observer from '../libs/observer';

// Filter Factory
export const createFilter = (trigger) => {
    const instance = Object.assign({}, observer()); // Object composition
    const state = {
        showFinished: false
    };

    const clickHandler = e => {
        state.showFinished = e.target.checked;

        // Notify all subscribers
        instance.trigger('changed', state.showFinished);
    };

    trigger.addEventListener('change', clickHandler);

    // Expose state.showFinished
    instance.showFinished = () => state.showFinished;

    // Some serious exposing happens here
    return instance;
};
