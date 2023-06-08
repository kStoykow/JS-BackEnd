const logoutController = require('express').Router();

logoutController.get('/', async (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
});

module.exports = logoutController;
