const isUser = require('../middleware/isUserGuard');

const logoutController = require('express').Router();

logoutController.get('/', isUser, (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
});

module.exports = logoutController;
