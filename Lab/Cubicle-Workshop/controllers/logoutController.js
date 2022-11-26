const logoutController = require('express').Router();

logoutController.get('/', async (req, res) => {
    res.cookie('token', '');
    res.redirect('/');
});

module.exports = logoutController;