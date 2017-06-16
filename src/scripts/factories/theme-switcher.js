// Theme Switcher Factory
export const createThemeSwitcher = (container) => {
    const options = ['light', 'dark'];

    /**
     * Set active theme
     *
     * @param {String} theme to switch to
     */
    const setTheme = (theme) => {
        document.body.classList.toggle(options[0], options[0] === theme);
        document.body.classList.toggle(options[1], options[1] === theme);

        triggers.forEach((trigger) => {
            trigger.classList.toggle('is-active', trigger.getAttribute('data-switch-trigger') === theme);
        });
    };

    // Glob triggers
    const triggers = container.querySelectorAll('[data-switch-trigger]');

    // Attach event listeners
    triggers.forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            setTheme(trigger.getAttribute('data-switch-trigger'));
        });
    });

    // Set option1 as default theme at pageload
    setTheme(options[0]);

    // Some serious exposing happens here
    return {
        setTheme
    };
};
