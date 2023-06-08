const { logout } = require('../services/userService');

const logoutController = require('express').Router();

logoutController.get('/', async (req, res) => {
    logout(req, res);
    res.redirect('/');
});

module.exports = logoutController;
