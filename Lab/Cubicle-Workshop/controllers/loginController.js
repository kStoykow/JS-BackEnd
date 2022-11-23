const loginController = require('express').Router();

loginController.get('/', (req, res) => res.render('login'));

loginController.post('/', async (req, res) => res.redirect('/'));

module.exports = loginController;