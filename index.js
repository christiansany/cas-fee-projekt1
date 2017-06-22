const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

// Import Routes
const noteRoutes = require('./routes/note-routes');

// Exposes Socket to all middlewares
const provideSocket = function(req, res, next) {
    if(!req.hasOwnProperty('io')) {
        req.io = io;
        next();
    } else {
        res.status(500);
        res.send('I don\'t know how to feel about this. This should never happen.');
    }
};

app.use(provideSocket);
app.use(bodyParser.json());
app.use(noteRoutes);
app.use(express.static(__dirname + '/public'));

const hostname = '127.0.0.1';
const port = 8080;
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
