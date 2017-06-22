/**
 * Router Factory
 *
 * @param {Element} container as factory root element
 * @return {Object} instance
 */
export const createRouter = container => {
    const instance = Object.assign({});

    const views = container.querySelectorAll('[data-route]');

    instance.push = (viewName) => {
        views.forEach((view) => {
            view.classList.toggle('is-active', view.getAttribute('data-route') === viewName);
        });
    };

    return instance;
};
