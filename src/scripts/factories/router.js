export const createRouter = (container) => {
    const instance = Object.assign({});

    const views = container.querySelectorAll('[data-route]');

    instance.push = (viewName) => {
        views.forEach((view) => {
            view.classList.toggle('is-active', view.getAttribute('data-route') === viewName);
        });

        // Doesn't work with browserify
        // window.history.pushState({ 'pageTitle': document.title }, '', viewName);
    };

    return instance;
};
