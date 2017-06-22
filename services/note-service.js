const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

module.exports.getNotes = function() {
    return new Promise(function(resolve, reject) {
        db.find({}, function(err, notes) {
            if(err)
                reject(err);
            resolve(notes);
        });
    });
};

module.exports.getNote = function(id) {
    return new Promise(function(resolve, reject) {
        db.findOne({ _id: id }, function(err, notes) {
            if(err)
                reject(err);

            if (!notes)
                reject(404);

            resolve(notes);
        });
    });
};

module.exports.addNote = function(note) {
    return new Promise(function(resolve, reject) {
        db.insert(note, function(err, newNote) {
            if(err)
                reject(err);
            resolve(newNote);
        });
    });
};

module.exports.updateNote = function(id, note) {
    return new Promise(function(resolve, reject) {
        db.update({ _id: id }, note, function(err) {
            if(err)
                reject(err);
            resolve(note);
        });
    });
};

module.exports.deleteNote = function(id) {
    return new Promise(function(resolve, reject) {
        db.remove({ _id: id }, {}, function (err) {
            if(err)
                reject(err);
            resolve();
        });
    });
};
