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
import Moment from 'moment';
// import themeSwitcher from './factories/theme-switcher';
// import pubsub from './helpers/pubsub';
// import handlebars from 'handlebars';
// import handlebars from 'handlebars';
// import render from './composites/render';
// import { view } from './composites/mvc';
// const Handlebars = require('handlebars');
import noteTemplate from '../templates/note.hbs';

import { createThemeSwitcher } from './factories/theme-switcher';
import { createSorter } from './factories/sorter';

// class Note {
//     constructor(data) {
//         this.title = data.title;
//         this.description = data.description;
//         this.importance = data.importance;
//         this.created = data.created;
//         // this.title = data.title;
//     }
// }

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
    const instance = Object.assign({}, observer());

    const listDelegate = event => {

        let trigger;
        const uid = event.target.closest('[data-note]').getAttribute('data-note');

        if((trigger = event.target.closest('[data-finish-note]')) !== null) {
            (trigger.checked) ? instance.trigger('finish', uid) : instance.trigger('unfinish', uid);
        } else if(event.target.closest('[data-note-edit]') !== null) {
            instance.trigger('edit', uid);
        } else if(event.target.closest('[data-note-delete]') !== null) {
            instance.trigger('delete', uid);
        }
    };

    instance.renderNotes = (notes) => {
        listContainer.innerHTML = '';

        notes.forEach(note => {
            listContainer.innerHTML += noteTemplate(note);
        });
    };

    const listContainer = container.querySelector('[data-notelist-list]');

    listContainer.addEventListener('click', listDelegate);

    return instance;
};

const notelist = createNoteList(document.querySelector('[data-notelist]'));

notelist.on('finish', uid => {
    Model.update(uid, {
        finished: new Moment(),
        get finishedFormated() {
            return this.finished.format('DD.MM.YYYY');
        }
    });
});

notelist.on('unfinish', uid => {
    Model.update(uid, {
        finished: false,
        get finishdate() {
            return '';
        }
    });
});

notelist.on('edit', uid => {
    console.log('Switch to edit mask with ID', uid);
});

notelist.on('delete', uid => {
    Model.remove(uid);
});


import Model from './models/note-model';

window.model = Model;

// Callback wil be called, every time the notes get mutated
Model.stream('notes', notes => {
    notelist.renderNotes(notes);
});


// Function to create test data
window.genNotes = function() {
    Model.add({
        title: 'Explore the street art of East London 1',
        description: 'Climb leg rub face on everything give attitude nap all day for under the bed. Chase mice attack feet but rub face on everything hopped up on goofballs.',
        importance: 5,
        due: new Moment('2017-08-21'),
        get dueFormated() {
            return this.due.format('DD.MM.YYYY');
        }
    });

    Model.add({
        title: 'Explore the street art of East London 2',
        description: 'Climb leg rub face on everything give attitude nap all day for under the bed. Chase mice attack feet but rub face on everything hopped up on goofballs.',
        importance: 5,
        due: new Moment('2017-08-22'),
        get dueFormated() {
            return this.due.format('DD.MM.YYYY');
        }
    });

    Model.add({
        title: 'Explore the street art of East London 3',
        description: 'Climb leg rub face on everything give attitude nap all day for under the bed. Chase mice attack feet but rub face on everything hopped up on goofballs.',
        importance: 5,
        due: new Moment('2017-08-23'),
        get dueFormated() {
            return this.due.format('DD.MM.YYYY');
        }
    });

    Model.add({
        title: 'Explore the street art of East London 4',
        description: 'Climb leg rub face on everything give attitude nap all day for under the bed. Chase mice attack feet but rub face on everything hopped up on goofballs.',
        importance: 5,
        due: new Moment('2017-08-24'),
        get dueFormated() {
            return this.due.format('DD.MM.YYYY');
        }
    });
};

// Model
// import NoteModel from './models/note-model';
