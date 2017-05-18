import handlebars from 'handlebars';

/*
 * View composite
 *
 * Acts as composite for views
 * TODO: documentation
 */
export const view = () => {

    /**
     * Fetch a template
     *
     * TODO: further description
     *
     * @param {String} url to fetch
     * @return {Promise} with responsetext
     */
    const fetch = function (url) {
        return window.fetch(url)
            .then(response => response.text());
    };

    /*
     * TODO: documentation
     */
    const compile = function (template) {
        const self = this;
        return new Promise(resolve => {
            self.template = handlebars.compile(template);
            resolve(self.template);
        });
    };

    /*
     * TODO: documentation
     */
    const render = function () {
        return new Promise(resolve => {
            this.$el.innerHTML = this.template(this.data);
            this.trigger('rendered', this.$el);
            resolve(this.$el);
        });
    };

    return {
        fetch,
        compile,
        render
    };
};
