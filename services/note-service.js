const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

module.exports.getNotes = function() {
    return new Promise(function(resolve, reject) {
        try {
            db.find({}, function (err, notes) {
                resolve(notes);
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports.addNote = function(note) {
    return new Promise(function(resolve, reject) {
        try {
            db.insert(note, function(err, newNote) {
                resolve(newNote);
            });
        } catch (e) {
            reject(e);
        }
    });
};
