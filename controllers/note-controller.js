const store = require('../services/note-service');

module.exports.getNotes = function(req, res) {
    store.getNotes()
        .then(function(notes) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                notes: notes
            }));
        })
        .catch(function(err) {
            res.status(500);
            res.send(err);
        });
};

module.exports.getNote = function(req, res) {
    store.getNote(req.params.id)
        .then(function(note) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(note));
        })
        .catch(function(err) {
            if (err === 404) {
                res.status(404);
                res.send();
            } else {
                res.status(500);
                res.send(err);
            }
        });
};

module.exports.postNote = function(req, res) {
    store.addNote(req.body)
        .then(function(note) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(note));
        })
        .catch(function(err) {
            res.status(500);
            res.send(err);
        });
};

module.exports.putNote = function(req, res) {
    store.updateNote(req.params.id, req.body)
        .then(function(note) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(note));
        })
        .catch(function(err) {
            res.status(500);
            res.send(err);
        });
};

module.exports.deleteNote = function(req, res) {
    store.deleteNote(req.params.id)
        .then(function() {
            res.setHeader('Content-Type', 'application/json');
            res.send({
                _id: req.params.id
            });
        })
        .catch(function(err) {
            res.status(500);
            res.send(err);
        });
};
