/**
 * @file
 * Render composite
 *
 * @author Christian Sany <christian.sany@bluewin.ch>
 */
export default {

    /**
     * Render
     *
     * @param {Object} data to be rendered inside the template
     * @return {Promise} with compiled template
     */
    render (data) {

        data = data || self.data;

        const self = this;
        return new Promise(resolve => {

            // Render precompiled template with data into the DOM
            self.$el.innerHTML = self.template(data);

            // Trigger listeners for the rendered event
            self.trigger('rendered', self.$el);

            // Resolve Promise with rendered ParentElement (contains rendered)
            resolve(self.$el);
        });
    }
};
