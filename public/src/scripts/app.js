/**
 * @file Main entry point of Noter, the notesapp to stay organized
 *
 * @author christian.sany@notch-interactive.com
 */

// TODO: Add documentation in readme file on how to set up this project
// TODO: Make a node server and implement model layer there
// TODO: Refactor this file here to be 'prettier'

// Dependencies
// import observer from './libs/observer';
import Moment from 'moment';
import Handlebars from 'handlebars/runtime';

// https://stackoverflow.com/questions/11924452/iterating-over-basic-for-loop-using-handlebars-js
Handlebars.registerHelper('times', (n, block) => {
    let accum = '';
    for(let i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

// Models
import Notes from './models/note-model';

// Views
import { createRouter } from './factories/router';
import { createThemeSwitcher } from './factories/theme-switcher';
import { createSorter } from './factories/sorter';
import { createFilter } from './factories/filter';
import { createNoteList } from './factories/note-list';
import { createForm } from './factories/form';

// Instanciate Viewmodels
const router = createRouter(document.querySelector('[data-router-outlet]'));
const themeSwitcher = createThemeSwitcher(document.querySelector('[data-theme-switcher]'));
const sorter = createSorter(document.querySelector('[data-filter]'));
const filter = createFilter(document.querySelector('[data-show-finished]'));
const noteList = createNoteList(document.querySelector('[data-notelist]'));
const form = createForm(document.querySelector('[data-form]'));

/**
 * updateList
 *
 * Tells the NoteList to render the Notes because of some change
 */
const updateList = () => {
    const sort = sorter.getSort();
    const notes = Notes.notes
        .filter((filter.showFinished()) ? () => true : note => !note.finishDate)
        .sort((a, b) => {
            if(sort === 'duedate') {
                return a.dueDate - b.dueDate;
            } else if (sort === 'creationdate') {
                return a.createdDate - b.createdDate;
            } else if (sort === 'importance') {
                return b.importance - a.importance;
            }
        });

    noteList.renderNotes(notes);
};

// Load sort from last visit (if visited before)
const sort = localStorage.getItem('sort');
if(sort) {
    sorter.setSort(sort);
}

sorter.on('changed', sort => {
    localStorage.setItem('sort', sort); // Save sort to localStorage
    updateList();
});

// Load activeFilter from last visit (if visited before)
const activeFilter = localStorage.getItem('activeFilter');
if(activeFilter) {
    filter.setFilter(JSON.parse(activeFilter)); // JSON.parse converts the string to an actual boolean
}

filter.on('changed', activeFilter => {
    localStorage.setItem('activeFilter', activeFilter); // Save activeFilter to localStorage
    updateList();
});

// filter.on('changed', updateList);
Notes.stream('notes', updateList); // Subscribes to Notes beeing mutated and instantly calls the callback when registering




// const showFinishedTrigger = document.querySelector('[data-show-finished]');
// showFinishedTrigger.addEventListener('change', e => {
//     console.log(e.target.checked);
// });

const newNoteTrigger = document.querySelector('[data-new-note]');
newNoteTrigger.addEventListener('click', e => {
    e.preventDefault();

    document.querySelector('[data-edit-new-title]').innerHTML = 'New Note';

    router.push('/new-edit');
});

// Load theme from last visit (if visited before)
const theme = localStorage.getItem('theme');
if(theme) {
    themeSwitcher.setTheme(theme);
}

// Save the current theme to localstorage
themeSwitcher.on('changed', theme => {
    localStorage.setItem('theme', theme);
});



// Subscribe to cancle
form.on('cancle', () => {
    form.clear(); // Clear the form
    router.push('/list'); // Route back to the list view
});

form.on('submit', data => {

    // Check if an edit was made, or a new Note should be generated
    if(data.hasOwnProperty('uid') && data.uid !== '') {
        Notes.updateNote(data.uid, data);
    } else {
        Notes.addNote(data);
    }

    form.clear(); // Clear the form
    router.push('/list'); // Route back to the list view
});











noteList.on('finish', uid => {
    Notes.updateNote(uid, {
        finishDate: new Moment()
    });
});

noteList.on('unfinish', uid => {
    Notes.updateNote(uid, {
        finishDate: false
    });
});

noteList.on('edit', uid => {

    // Populate form fields with Notedata
    form.populateFields(Notes.notes.find(n => n.uid === uid));

    document.querySelector('[data-edit-new-title]').innerHTML = 'Edit Note';

    router.push('/new-edit');
});

noteList.on('delete', Notes.removeNote);





// Function to create test data
window.genNotes = function() {
    Notes.addNote({
        title: 'Explore the street art of East London 1',
        description: 'Climb leg rub face on everything give attitude nap all day for under the bed. Chase mice attack feet but rub face on everything hopped up on goofballs.',
        importance: 2,
        dueDate: '21.08.2017'
    });

    // Notes.addNote({
    //     title: 'Explore the street art of East London 2',
    //     description: 'Climb leg rub face on everything give attitude nap all day for under the bed. Chase mice attack feet but rub face on everything hopped up on goofballs.',
    //     importance: 4,
    //     dueDate: '26.08.2017'
    // });
    //
    // Notes.addNote({
    //     title: 'Explore the street art of East London 3',
    //     description: 'Climb leg rub face on everything give attitude nap all day for under the bed. Chase mice attack feet but rub face on everything hopped up on goofballs.',
    //     importance: 3,
    //     dueDate: '20.08.2017'
    // });
    //
    // Notes.addNote({
    //     title: 'Explore the street art of East London 4',
    //     description: 'Climb leg rub face on everything give attitude nap all day for under the bed. Chase mice attack feet but rub face on everything hopped up on goofballs.',
    //     importance: 5,
    //     dueDate: '25.08.2017'
    // });
};

// Notes
// import NoteModel from './models/note-model';
