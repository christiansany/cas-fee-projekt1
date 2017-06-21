// Dependencies
import observer from '../libs/observer';
// import Moment from 'moment';
import { Note } from './note';

// NoteModel factory
const NoteModel = () => {
    const self = {
        notes: []
    };
    const notes = []; // private variable
    const ob = observer(); // generate private observer for model internal communication

    // Private functions
    const fetchNotes = () => {

        // Fetch notes from localStorage
        // This will later be replaced by the ajaxcall
        const temp = JSON.parse(localStorage.getItem('notes'));

        // Check if notes found in localStorage
        if (temp !== null) {

            const notes = temp.map(note => new Note(note));

            self.notes.push(...notes);

            // Set the internal uid to the highest found note
            self.notes.forEach(note => uid = (uid < note.uid) ? note.uid : uid);
        }

        // TODO: When polling is activated, a comparison should be made between the temp and the notes array, trigger subscribers only, when actually something changed
        ob.trigger('notes', self.notes, 'fetched');

        // Set fetched to true, since the notes are fetched now
        fetched = true;
    };

    const save = () => {

        const notes = self.notes.map(note => Note.serialize(note));

        // Save notes to localStorage
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    // Internal flag
    let fetched = false; // Set to true when initial fetching for the data is finished

    let uid = 0;

    // Public functions
    self.addNote = (data) => {
        // Creature unique id for note and assign it to the note
        uid++;

        const note = new Note(Object.assign({}, data, {
            uid: '' + uid
        }));

        // Push on notes
        self.notes.push(note);

        // Saves current notes to localStorage
        save();

        // Trigger stream subscribtions
        ob.trigger('notes', self.notes, 'added');
    };

    self.updateNote = (uid, data) => {

        const note = self.notes.find(n => n.uid === uid);

        for (var key in data) {

            // Check for both the data and the note to have the property to change it (also, filter out uid changes, since this is prohibited)
            if (data.hasOwnProperty(key) && note.hasOwnProperty(key) && key !== 'uid') {
                note[key] = data[key];
            }
        }

        // Saves current notes to localStorage
        save();

        // Trigger stream subscribtions
        ob.trigger('notes', self.notes, 'updated');
    };

    self.removeNote = (uid) => {

        // Iteration stops at first return of true
        self.notes.splice(self.notes.findIndex(note => note.uid === uid), 1);

        // Saves current notes to localStorage
        save();

        // Trigger stream subscribtions
        ob.trigger('notes', self.notes, 'removed');
    };

    /**
     * Steams are beeing subscribed and a callback is given
     *
     * Goal with the stream is to give an redux like feeling
     *
     * @param {String} content to stream ('notes', 'noteById')
     * @param {Function} callback to call
     */
    self.stream = (content, callback) => {

        // When notes array is
        if (content === 'notes') {

            // Already fetched
            if (fetched) {

                // Call callback immediatly
                callback(notes);
            }

            // Subscribe to stream, callback will be called every time a note gets added, removed or mutated
            ob.on('notes', callback);
        }
    };

    // Fetch notes from the server
    fetchNotes();

    return self;
};

export default NoteModel();
