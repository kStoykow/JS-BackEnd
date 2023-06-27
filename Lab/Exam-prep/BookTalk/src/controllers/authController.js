const authController = require('express').Router();

const errorParser = require('../util/errorParser');
const isGuest = require('../middlewares/isGuest');
const isUser = require('../middlewares/isUser');
const { register, login } = require('../services/userService');

//TODO: check guards

authController.get('/login', isGuest, (req, res) => res.render('login', { user: req.user }));
authController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await login(email, password);
        res.cookie('user', token);
        res.redirect('/'); 
    } catch (error) {
        res.render('login', { user: req.user, body: req.body, error: errorParser(error) }); //TODO: check if populating form
    }
});

authController.get('/register', isGuest, (req, res) => res.render('register', { user: req.user }));
authController.post('/register', isGuest, async (req, res) => {
    console.log(req.body);
    const { email, username, password, repeatPassword } = req.body;

    try {
        if (!username) {
            throw 'Username is required.';
        }
        if (!email) {
            throw 'Email is required.';
        }
        if (!password || (password !== repeatPassword)) {
            throw 'Password missmatch.'
        }

        const user = await register(username, email, password);

        res.redirect('/');

    } catch (error) {
        res.render('register', { user: req.user, body: req.body, error: errorParser(error) });
    }
});

authController.get('/profile', (req, res) => {
    try {
        res.render('profile');
    } catch (error) {
        res.render('register', { user: req.user, error: errorParser(error) });

    }
});

authController.get('/logout', isUser, (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
});

module.exports = authController;