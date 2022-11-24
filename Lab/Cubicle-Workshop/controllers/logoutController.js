const logoutController = require('express').Router();

logoutController.get('/', async (req, res) => {
    console.log('logout');
    res.cookie('token', '');
    res.redirect('/');
});

module.exports = logoutController;