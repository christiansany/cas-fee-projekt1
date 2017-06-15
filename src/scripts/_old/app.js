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
import './polyfills/object-assign';

// Dependencies
import observer from './libs/observer';
import themeSwitcher from './factories/theme-switcher';
// import pubsub from './helpers/pubsub';
// import handlebars from 'handlebars';
// import handlebars from 'handlebars';
import render from './composites/render';
// import { view } from './composites/mvc';
// const Handlebars = require('handlebars');
import template from '../templates/app.hbs';

// Model
import NoteModel from './models/note-model';

// console.log(templatess);




// AppController factory
const App = (el) => {

    const $state = {
        theme: 'light'
    }

    const self = {
        model: NoteModel,
        view: AppView(el, $state),
        themeSwitcher: themeSwitcher(),
        $state
    };

    // TODO: this is only temprarily for testing in the browser
    window.model = self.model;

    self.model.stream('notes', (notes) => {
        self.view.render({ notes });
    });

    // Listen to Events from the View
    self.view.on('theme-switch', (newTheme) => {
        if(self.$state.theme !== newTheme) {
            self.view.setTheme(newTheme, self.$state.theme);
            self.$state.theme = newTheme;
        }
    });

    return self;
};

// AppView factory
const AppView = ($el, state) => {

    // Create instance and add two composites (observer and render)
    const self = Object.assign({}, observer(), render, {
        $el: $el,
        template
    });

    // Set up the eventbinding every time the DOM gets rerendered (reactive)
    self.on('rendered', () => {
        const themeSwitchTriggers = self.$el.querySelectorAll('[data-theme-switcher]');
        themeSwitchTriggers.forEach((el) => {
            el.addEventListener('click', () => {

                // trigger event on what the controlller can listen
                self.trigger('theme-switch', el.getAttribute('data-theme'));
            });
        });
    });

    self.setTheme = (newTheme, oldTheme) => {
        document.body.classList.remove(oldTheme);
        document.body.classList.add(newTheme);
    };

    return self;
};

App(document.querySelector('app'));
