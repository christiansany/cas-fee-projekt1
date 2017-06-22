// Dependencies
import observer from '../libs/observer';
import { Note } from './note';

// NoteModel factory
const NoteModel = () => {
    const self = {
        notes: []
    };
    const ob = observer(); // generate private observer for model internal communication
    let fetched = false; // Set to true when initial fetching for the data is finished

    // Private functions
    const fetchNotes = () => {

        // We just assume there would never be an error, errorhandling could of course be added
        return new Promise(resolve => {
            fetch('/notes')
                .then(res => res.json())
                .then(data => {
                    const notes = data.notes.map(note => new Note(note));

                    self.notes.push(...notes);

                    // Set fetched to true, since the notes are fetched now
                    fetched = true;

                    ob.trigger('notes', self.notes, 'fetched');

                    resolve();
                });
        });
    };

    // Public functions
    self.addNote = data => {

        // We just assume there would never be an error, errorhandling could of course be added
        return new Promise(resolve => {
            const note = new Note(data);

            const params = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Note.serialize(note))
            };

            fetch('/notes', params)
                .then(res => res.json())
                .then(data => {
                    self.notes.push(new Note(data));
                    ob.trigger('notes', self.notes, 'added');

                    resolve();
                });
        });
    };

    self.updateNote = (_id, data) => {

        // We just assume there would never be an error, errorhandling could of course be added
        return new Promise(resolve => {
            const note = self.notes.find(n => n._id === _id);

            for (var key in data) {

                // Check for both the data and the note to have the property to change it (also, filter out _id changes, since this is prohibited)
                if (data.hasOwnProperty(key) && note.hasOwnProperty(key) && key !== '_id') {
                    note[key] = data[key];
                }
            }

            const params = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Note.serialize(note))
            };

            fetch('/notes/' + note._id, params)
                .then(res => res.json())
                .then(() => {
                    ob.trigger('notes', self.notes, 'updated');

                    resolve();
                });
        });
    };

    self.removeNote = (_id) => {

        // We just assume there would never be an error, errorhandling could of course be added
        return new Promise(resolve => {
            const params = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };

            fetch('/notes/' + _id, params)
                .then(res => res.json())
                .then(data => {
                    self.notes.splice(self.notes.findIndex(note => note._id === data._id), 1);

                    ob.trigger('notes', self.notes, 'removed');

                    resolve();
                });
        });
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
                callback(self.notes);
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
