import observer from '../libs/observer';

// Sorter Factory
export const createSorter = container => {
    const instance = Object.assign({}, observer()); // Object composition
    const state = {
        sort: ''
    };

    instance.setSort = (sort) => {
        state.sort = sort;

        triggers.forEach((trigger) => {
            trigger.classList.toggle('is-active', trigger.getAttribute('data-filter-trigger') === state.sort);
        });

        // Notify all subscribers
        instance.trigger('changed', state.sort);
    };

    // Expose state.sort
    instance.getSort = () => state.sort;

    // Cache triggers
    const triggers = container.querySelectorAll('[data-filter-trigger]');

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            instance.setSort(trigger.getAttribute('data-filter-trigger'));
        });
    });

    // Set the first active sort to the first sorter btn found
    instance.setSort(triggers[0].getAttribute('data-filter-trigger'));

    // Some serious exposing happens here
    return instance;
};
