import observer from '../libs/observer';

// Precompiled via handlebars-loader
import noteTemplate from '../../templates/note.hbs';

/**
 * NoteList Factory
 *
 * @param {Element} container as factory root element
 * @return {Object} instance
 */
export const createNoteList = container => {
    const instance = Object.assign({}, observer()); // Object composition

    const showNotesContainer = () => {
        listContainer.style.display = 'block';
        noResultsContainer.style.display = 'none';
    };

    const showNoResultsContainer = () => {
        listContainer.style.display = 'none';
        noResultsContainer.style.display = 'block';
    };

    const listDelegate = e => {

        let trigger;
        const uid = event.target.closest('[data-note]').getAttribute('data-note');

        if((trigger = event.target.closest('[data-finish-note]')) !== null) {
            e.preventDefault();
            (trigger.checked) ? instance.trigger('finish', uid) : instance.trigger('unfinish', uid);
        } else if(event.target.closest('[data-note-edit]') !== null) {
            e.preventDefault();
            instance.trigger('edit', uid);
        } else if(event.target.closest('[data-note-delete]') !== null) {
            e.preventDefault();
            instance.trigger('delete', uid);
        }
    };

    instance.renderNotes = (notes) => {
        (notes.length !== 0) ? showNotesContainer() : showNoResultsContainer();

        listContainer.innerHTML = '';

        notes.forEach(note => {
            listContainer.innerHTML += noteTemplate(note);
        });
    };

    const listContainer = container.querySelector('[data-notelist-list]');
    const noResultsContainer = container.querySelector('[data-notelist-empty-message]');

    listContainer.addEventListener('click', listDelegate);

    noResultsContainer.style.display = 'none';

    return instance;
};
