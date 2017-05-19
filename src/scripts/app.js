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
    const self = {
        model: NoteModel,
        view: AppView(el),
        themeSwitcher: themeSwitcher()
    };

    // TODO: this is only temprarily for testing in the browser
    window.model = self.model;

    self.model.stream('notes', (notes) => {
        self.view.render({ notes });
    });

    // Listen to Events from the View
    self.view.on('button-clicked', () => {
        self.themeSwitcher.toggleTheme();
    });

    return self;
};

// AppView factory
const AppView = ($el) => {

    // Create instance and add two composites (observer and render)
    const self = Object.assign({}, observer(), render, {
        $el: $el,
        // template: handlebars.compile(template)
        template
    });

    // Set up the eventbinding every time the DOM gets rerendered (reactive)
    self.on('rendered', () => {
        // self.$el.querySelector('button').addEventListener('click', (e) => {
        //     self.trigger('button-clicked', e);
        // });
    });

    return self;
};

App(document.querySelector('app'));
