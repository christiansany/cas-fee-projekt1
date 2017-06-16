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

import { createThemeSwitcher } from './factories/theme-switcher';
import { createSorter } from './factories/sorter';

// Instanciate themeSwitcher
createThemeSwitcher(document.querySelector('[data-theme-switcher]'));

const sorter = createSorter(document.querySelector('[data-filter]'));

sorter.on('sortChange', (sort) => {
    console.log('Sort Notes by:', sort);
});

const showFinishedTrigger = document.querySelector('[data-show-finished]');
showFinishedTrigger.addEventListener('change', (event) => {
    console.log(event.target.checked);
});

const newNoteTrigger = document.querySelector('[data-new-note]');
newNoteTrigger.addEventListener('click', () => {
    console.log('I want to create a new Note');
});



// Notelist Factory
const createNoteList = (container) => {

};

const notelist = createNoteList(document.querySelector('[data-notelist]'));

// const themeSwitcher = document.querySelectorAll()



// Model
// import NoteModel from './models/note-model';
