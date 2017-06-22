const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Import Routes
const noteRoutes = require('./routes/note-routes');

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(noteRoutes);
app.use(express.static(__dirname + '/public'));

const hostname = '127.0.0.1';
const port = 8080;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
