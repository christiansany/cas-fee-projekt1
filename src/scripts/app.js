/**
 * @file Main entry point of Noter, the notesapp to stay organized
 *
 * @author christian.sany@notch-interactive.com
 */

// Import polyfills
// No polyfills will be used, since this Project doesn't have to support older Browsers

// Dependencies
import observer from './libs/observer';
import Moment from 'moment';
// import themeSwitcher from './factories/theme-switcher';
// import pubsub from './helpers/pubsub';
// import handlebars from 'handlebars';
// import handlebars from 'handlebars';
// import render from './composites/render';
// import { view } from './composites/mvc';
import Handlebars from 'handlebars/runtime';

Handlebars.registerHelper('times', (n, block) => {
    let accum = '';
    for(let i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

// Components
import { createThemeSwitcher } from './factories/theme-switcher';
import { createSorter } from './factories/sorter';
import { createForm } from './factories/form';
import { createRouter } from './factories/router';
import { createNoteList } from './factories/note-list';

// TODO: This controller should not have a copy of the notes

const state = {
    notes: []
};

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
showFinishedTrigger.addEventListener('change', e => {
    console.log(e.target.checked);
});

const newNoteTrigger = document.querySelector('[data-new-note]');
newNoteTrigger.addEventListener('click', e => {
    e.preventDefault();
    router.push('/new-edit');
});




//
// const createRouter = (container) => {
//     const instance = Object.assign({}, observer());
//
//     const views = container.querySelectorAll('[data-route]');
//
//     instance.push = (viewName) => {
//         views.forEach((view) => {
//             view.classList.toggle('is-active', view.getAttribute('data-route') === viewName);
//         });
//
//         // Doesn't work with browserify
//         // window.history.pushState({ 'pageTitle': document.title }, '', viewName);
//     };
//
//     return instance;
// };

const router = createRouter(document.querySelector('[data-router-outlet]'));

const form = createForm(document.querySelector('[data-form]'));

// Subscribe to cancle
form.on('cancle', () => {

    // Clear the form
    form.clear();

    // Route back to the list view
    router.push('/list');
});

form.on('submit', (data) => {

    // Check if an edit was made, or a new Note should be generated
    if(data.hasOwnProperty('uid') && data.uid !== '') {
        Model.updateNote(data.uid, data);
    } else {
        Model.addNote(data);
    }

    // Clear the form
    form.clear();

    // Route back to the list view
    router.push('/list');
});










const notelist = createNoteList(document.querySelector('[data-notelist]'));

notelist.on('finish', uid => {
    Model.updateNote(uid, {
        finishDate: new Moment()
    });
});

notelist.on('unfinish', uid => {
    Model.updateNote(uid, {
        finishDate: false
    });
});

notelist.on('edit', uid => {

    // Populate form fields with Notedata
    form.populateFields(Model.notes.find(n => n.uid === uid));
    router.push('/new-edit');
});

notelist.on('delete', uid => {
    Model.removeNote(uid);
});

// The state changed, please re-render the list
const stateChange = () => {
    const notes = Model.notes;

    console.log(sorter.getSort());

    // console.log('renders', notes);

    notelist.renderNotes(notes);
};



import Model from './models/note-model';

// Callback wil be called, every time the notes get mutated
Model.stream('notes', stateChange);


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
