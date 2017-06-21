import observer from '../libs/observer';

// Tempaltes -> Are getting laoded via handlebars-loader
import noteTemplate from '../../templates/note.hbs';

// NoteList Factory
export const createNoteList = (container) => {
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
