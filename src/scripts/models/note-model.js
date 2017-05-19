// Dependencies
import observer from '../libs/observer';

// NoteModel factory
const NoteModel = () => {
    const self = {};
    const notes = []; // private variable
    const ob = observer(); // generate private observer for model internal communication

    // Private functions
    const fetchNotes = () => {

        // Fetch notes from localStorage
        // This will later be replaced by the ajaxcall
        const temp = JSON.parse(localStorage.getItem('notes'));

        // Check if notes found in localStorage
        if (temp !== null) {
            // notes = temp;
            notes.push(...temp);

            // Set the internal uid to the highest found note
            notes.forEach(note => uid = (uid < note.uid) ? note.uid : uid);
        }

        // TODO: When polling is activated, a comparison should be made between the temp and the notes array, trigger subscribers only, when actually something changed
        ob.trigger('notes', notes, 'fetched');

        // Set fetched to true, since the notes are fetched now
        fetched = true;
    };

    // Internal flag
    let fetched = false; // Set to true when initial fetching for the data is finished

    let uid = -1;

    // Public functions
    self.add = (note) => {
        // TODO: add checking of object
        // TODO: performe ajax like task (ajax comes later)

        console.log('add', note);

        // Creature unique id for note and assign it to the note
        uid++;
        Object.assign(note, {
            uid
        });

        return new Promise((resolve, reject) => {
            try {

                // Push on notes
                notes.push(note);

                // Save notes to localStorage
                localStorage.setItem('notes', JSON.stringify(notes));

                // Trigger stream subscribtions
                ob.trigger('notes', notes, 'added');

                // Resolve promise with
                resolve(note);
            } catch (e) {

                // in case the later ajax call fails
                reject(e);
            }
        });
    };

    self.update = (uid, note) => {

        console.log('update', note);

        // Trigger stream subscribtions
        ob.trigger('notes', notes, 'updated');
    };

    self.remove = (uid, note) => {

        console.log('remove', note);

        // Trigger stream subscribtions
        ob.trigger('notes', notes, 'removed');
    };

    /**
     * Steams are beeing subscribed and a callback is given
     *
     * Goal with the stream is to give an redux like feeling
     *
     * @param {String} content to stream ('notes', 'noteById')
     * @param {Function} callback to call
     *
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
