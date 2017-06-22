import observer from '../libs/observer';

/**
 * Theme Switcher Factory
 *
 * @param {Element} container as factory root element
 * @return {Object} instance
 */
export const createThemeSwitcher = container => {
    const instance = Object.assign({}, observer()); // Object composition
    const themes = [];
    const state = {
        theme: ''
    };

    /**
     * Set active theme
     *
     * @param {String} theme to switch to
     */
    instance.setTheme = theme => {
        state.theme = theme;

        // Change body class to represent theme
        themes.forEach(_theme => {
            document.body.classList.toggle(_theme, _theme === state.theme);
        });

        triggers.forEach(trigger => {
            trigger.classList.toggle('is-active', trigger.getAttribute('data-switch-trigger') === state.theme);
        });

        // Notify all subscribers
        instance.trigger('changed', state.theme);
    };

    // Expose state.sort
    instance.getTheme = () => state.theme;

    // Cache triggers
    const triggers = container.querySelectorAll('[data-switch-trigger]');

    triggers.forEach((trigger) => {
        const theme = trigger.getAttribute('data-switch-trigger');

        // Save theme in themes array
        themes.push(theme);

        // Attach event listeners
        trigger.addEventListener('click', e => {
            e.preventDefault();
            instance.setTheme(theme);
        });
    });

    // Set first theme as default theme at pageload
    instance.setTheme(themes[0]);

    // Some serious exposing happens here
    return instance;
};
