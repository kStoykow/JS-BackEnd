const { register } = require('../services/userService');
const isGuest = require('../middleware/isGUestGuard');

const registerController = require('express').Router();

registerController.get('/', isGuest, (req, res) => res.render('register', { user: req.user }));

registerController.post('/', isGuest, async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (username && password == repeatPassword) {
        await register(username, password);
        res.redirect('/');
    } else {
        res.render('register', { user: req.user });
    }
});

module.exports = registerController;