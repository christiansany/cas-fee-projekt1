/**
 * @file
 * Main entry point of the todo manager app
 *
 * @author christian.sany@notch-interactive.com
 */

// Import polyfills
import './polyfills/element-matches';
import './polyfills/element-closest';
import './polyfills/nodelist-foreach';
// TODO: implement object assign polyfill

// Dependencies
import observer from './libs/observer';
import themeSwitcher from './factories/theme-switcher';
// import pubsub from './helpers/pubsub';
// import handlebars from 'handlebars';
import { view } from './composites/mvc';
// const Handlebars = require('handlebars');

// AppController factory
const app = function (el) {
    const self = {
        view: AppView(el),
        themeSwitcher: themeSwitcher()
    };

    // Listen to Events from the View
    self.view.on('button-clicked', () => {
        self.themeSwitcher.toggleTheme();
    });

    return self;
};

// AppView factory
const AppView = function ($el, data) {

    // Create instance and add two composites (observer and view)
    const self = Object.assign({}, observer(), view(), {
        $el: $el,
        data: data || {}
    });

    // Set up the eventbinding every time the DOM gets rerendered (reactive)
    self.on('rendered', () => {
        self.$el.querySelector('button').addEventListener('click', (e) => {
            self.trigger('button-clicked', e);
        });
    });

    // Fetch the template compile it, render it the render lsitener will automatically attach/reattach events
    self.fetch('./build/templates/app.hbs')
        .then(self.compile.bind(self))
        .then(self.render.bind(self));

    return self;
};


app(document.querySelector('app'));
