import handlebars from 'handlebars';

/*
 * View composite
 *
 * Acts as composite for views
 * TODO: documentation
 */
export const view = {

    /**
     * Fetch a template
     *
     * TODO: further description
     *
     * @param {String} url to fetch
     * @return {Promise} with responsetext
     */
    fetch (url) {
        return window.fetch(url)
            .then(response => response.text());
    },

    /**
     * Compiler
     *
     * @param {String} template to compile
     * @return {Promise} with compiled template
     */
    compile (template) {
        const self = this;
        return new Promise(resolve => {

            // Save compiled Template in View
            self.template = handlebars.compile(template);
            console.log('tempalte gets assigned');

            // Resolve Promise with template
            resolve(self.template);
        });
    },

    /**
     * Render
     *
     * @param {String} template to compile
     * @return {Promise} with compiled template
     */
    render () {
        const self = this;
        return new Promise(resolve => {

            console.log('render:', self.data);

            // Render precompiled template with data into the DOM
            self.$el.innerHTML = self.template(self.data);

            // Trigger listeners for the rendered event
            self.trigger('rendered', self.$el);

            // Resolve Promise with rendered ParentElement (contains rendered)
            resolve(self.$el);
        });
    }
};
