const editController = require('express').Router();

editController.get('/', (req, res) => res.render('edit', { title: 'Edit Cube', user: req.user }));

editController.post('/', async (req, res) => res.redirect('/'));

module.exports = editController;