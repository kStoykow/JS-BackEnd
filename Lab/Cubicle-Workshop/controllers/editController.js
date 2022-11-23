const editController = require('express').Router();

editController.get('/', (req, res) => res.render('edit'));

editController.post('/', async (req, res) => res.redirect('/'));

module.exports = editController;