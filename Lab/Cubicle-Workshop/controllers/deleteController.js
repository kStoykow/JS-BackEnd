const deleteController = require('express').Router();

deleteController.get('/', (req, res) => res.render('delete'));

deleteController.post('/', (req, res) => res.redirect('/'));

module.exports = deleteController;