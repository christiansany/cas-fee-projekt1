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
// const Handlebars = require('handlebars');

// Tempaltes -> Are getting laoded via handlebars-loader
import noteTemplate from '../templates/note.hbs';

// Components
import { createThemeSwitcher } from './factories/theme-switcher';
import { createSorter } from './factories/sorter';

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
showFinishedTrigger.addEventListener('change', (event) => {
    console.log(event.target.checked);
});

const newNoteTrigger = document.querySelector('[data-new-note]');
newNoteTrigger.addEventListener('click', () => {
    router.push('/new-edit');
});





const createRouter = (container) => {
    const instance = Object.assign({}, observer());

    const views = container.querySelectorAll('[data-route]');

    instance.push = (viewName) => {
        views.forEach((view) => {
            view.classList.toggle('is-active', view.getAttribute('data-route') === viewName);
        });

        // Doesn't work with browserify
        // window.history.pushState({ 'pageTitle': document.title }, '', viewName);
    };

    return instance;
};

const router = createRouter(document.querySelector('[data-router-outlet]'));

window.router = router;






// import 'pikaday';
import Pikaday from './libs/pikaday';

const createForm = (container) => {
    const instance = Object.assign({}, observer());

    // const form = container;
    // const cancleButton = container.querySelector('[data-btn-cancle]');

    const elements = {
        form: container,
        uid: container.querySelector('[data-form-uid]'),
        title: container.querySelector('[data-form-title]'),
        description: container.querySelector('[data-form-description]'),
        importance: container.querySelector('[data-form-importance]'),
        due: container.querySelector('[data-form-due]'),
        cancleButton: container.querySelector('[data-btn-cancle]')
    };

    const picker = new Pikaday({
        field: elements.due,
        format: 'DD.MM.YYYY',
        firstDay: 1,
        minDate: new Date(),
        defaultDate: new Date(),
        setDefaultDate: true
    });

    // console.log(elements.due, picker);

    instance.populateFields = data => {
        elements.uid.value = data.uid;
        elements.title.value = data.title;
        elements.description.value = data.description;
        elements.importance.value = data.importance;
        elements.due.value = data.dueFormated;
        picker.setMoment(data.due);
    };

    instance.clear = () => {
        elements.uid.value = '';
        elements.title.value = '';
        elements.description.value = '';
        elements.importance.value = '';
        elements.due.value = '';
        picker.setDate(new Date());
    };

    elements.form.addEventListener('submit', e => {
        e.preventDefault();
        console.log('here comes fieldvalidation');
    });

    elements.cancleButton.addEventListener('click', () => {
        instance.trigger('cancle');
    });

    return instance;
};

const form = createForm(document.querySelector('[data-form]'));


// Subscribe to cancle
form.on('cancle', () => {

    // Clear the form
    form.clear();

    // Route back to the list view
    router.push('/list');
});

form.on('submit', (data) => {

    console.log('submit got triggered and validation was ok', data);

    // Clear the form
    form.clear();

    // Route back to the list view
    router.push('/list');
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

    // Populate form fields with Notedata
    form.populateFields(state.notes.find(n => n.uid === parseInt(uid)));
    router.push('/new-edit');
});

notelist.on('delete', uid => {
    Model.remove(uid);
});


import Model from './models/note-model';

window.model = Model;

// Callback wil be called, every time the notes get mutated
Model.stream('notes', notes => {
    state.notes = notes;
    notelist.renderNotes(state.notes);
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
