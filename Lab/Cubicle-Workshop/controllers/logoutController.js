const logoutController = require('express').Router();

logoutController.get('/', async (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = logoutController;