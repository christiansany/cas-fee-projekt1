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
// import observer from './libs/observer';
// import themeSwitcher from './factories/theme-switcher';
// import pubsub from './helpers/pubsub';
// import handlebars from 'handlebars';
// import handlebars from 'handlebars';
// import render from './composites/render';
// import { view } from './composites/mvc';
// const Handlebars = require('handlebars');
import template from '../templates/app.hbs';


// Theme Switcher factory
const createThemeSwitcher = (container) => {
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

    const triggers = container.querySelectorAll('[data-switch-trigger]');

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
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

// TODO: Remove unused when finishind app
const themeSwitcher = createThemeSwitcher(document.querySelector('[data-theme-switcher]'));


// const themeSwitcher = document.querySelectorAll()



// Model
// import NoteModel from './models/note-model';
