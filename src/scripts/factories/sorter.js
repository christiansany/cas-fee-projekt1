import observer from '../libs/observer';

// Sorter Factory
export const createSorter = (container) => {
    const instance = Object.assign({}, observer());

    const setSort = (sort) => {
        instance.trigger('sortChange', sort);

        triggers.forEach((trigger) => {
            trigger.classList.toggle('is-active', trigger.getAttribute('data-filter-trigger') === sort);
        });
    };

    const triggers = container.querySelectorAll('[data-filter-trigger]');

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
            setSort(trigger.getAttribute('data-filter-trigger'));
        });
    });

    // Some serious exposing happens here
    return instance;
};
