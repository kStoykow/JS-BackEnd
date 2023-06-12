const { register } = require('../services/userService');
const isGuest = require('../middleware/isGUestGuard');
const errorParser = require('../util/errorParser');

const registerController = require('express').Router();

registerController.get('/', isGuest, (req, res) => res.render('register', { user: req.user }));

registerController.post('/', isGuest, async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    try {
        if (!(/^[a-zA-Z0-9]+$/.test(password))) {
            throw 'Password must be from latin letters and numbers only.';
        }
        if (password.length < 8) {
            throw 'Password must be at least 8 characters long.';
        }
        if (password !== repeatPassword) {
            throw 'Passwords missmatch.';
        }

        await register(username, password);

        return res.redirect('/');

    } catch (error) {
        return res.render('register', { user: req.user, username: req.body.username, error: errorParser(error) });
    }

});

module.exports = registerController;