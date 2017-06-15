// ThemeSwitcher factory
// TODO: documentation
export default (options) => {
    const self = {};
    const settings = Object.assign({}, {
        active: 0,
        options: ['theme-light', 'theme-dark']
    }, options);

    /*
     * TODO: documentation
     */
    self.toggleTheme = () => {
        settings.active = settings.active === 1 ? 0 : 1;
        document.body.classList.toggle(settings.options[0], settings.active === 0);
        document.body.classList.toggle(settings.options[1], settings.active === 1);
    };

    // Initiation logic
    document.body.classList.toggle(settings.options[settings.active], true);

    return self;
};
