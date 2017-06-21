import observer from '../libs/observer';

// Sorter Factory
export const createSorter = (container) => {
    const instance = Object.assign({}, observer());
    const state = {
        sort: ''
    };

    const setSort = (sort) => {
        instance.trigger('sortChange', sort);

        state.sort = sort;

        triggers.forEach((trigger) => {
            trigger.classList.toggle('is-active', trigger.getAttribute('data-filter-trigger') === sort);
        });
    };

    // Expose state.sort
    instance.getSort = () => state.sort;

    const triggers = container.querySelectorAll('[data-filter-trigger]');

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            setSort(trigger.getAttribute('data-filter-trigger'));
        });
    });

    // Set the first active sort to the first sorter btn found
    setSort(triggers[0].getAttribute('data-filter-trigger'))

    // Some serious exposing happens here
    return instance;
};
