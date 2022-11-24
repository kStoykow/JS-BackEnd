const deleteController = require('express').Router();

deleteController.get('/', (req, res) => res.render('delete', { title: 'Delete Cube', user: req.user }));

deleteController.post('/', (req, res) => res.redirect('/'));

module.exports = deleteController;