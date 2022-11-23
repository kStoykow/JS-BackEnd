const logoutController = require('express').Router();

logoutController.get('/', async (req, res) => {
    console.log('logout');
    res.redirect('/');
});

module.exports = logoutController;