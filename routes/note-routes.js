const express = require('express');
const router = express.Router();
const controller = require('../controllers/note-controller');

router.get('/notes', controller.getNotes);
router.get('/notes/:id', controller.getNote);
router.post('/notes', controller.postNote);
router.put('/notes/:id', controller.putNote);
router.delete('/notes/:id', controller.deleteNote);

module.exports = router;
