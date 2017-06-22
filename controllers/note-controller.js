const store = require('../services/note-service');

module.exports.getNotes = function(req, res) {
    store.getNotes()
        .then(function(notes) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                notes: notes
            }));
        });
};

module.exports.getNote = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        action: 'getNote'
    }));
};

module.exports.postNote = function(req, res) {
    store.addNote(req.body)
        .then(function(note) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(note));
        });
};

module.exports.putNote = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        action: 'putNote'
    }));
};

module.exports.deleteNote = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        action: 'deleteNote'
    }));
};
