const authController = require('express').Router();

const errorParser = require('../util/errorParser');
const isGuest = require('../middlewares/isGuest');
const isUser = require('../middlewares/isUser');
const { register, login, verifyToken } = require('../services/userService');
const { closedAuctions } = require('../services/resourceService');

//TODO: check guards

authController.get('/login', isGuest, (req, res) => res.render('login', { user: req.user }));
authController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body; //TODO: check if email

    try {
        const token = await login(email, password);
        res.cookie('user', token);
        res.redirect('/');
    } catch (error) {
        res.render('login', { user: req.user, error: errorParser(error) });
    }
});


authController.get('/register', isGuest, (req, res) => res.render('register', { user: req.user }));
authController.post('/register', isGuest, async (req, res) => {
    const { email, firstName, lastName, password, repeatPassword } = req.body;

    try {

        if (!email) {
            throw 'Email is required.';
        }
        if (!password || (password !== repeatPassword)) {
            throw 'Password missmatch.'
        }
        if (password.length < 5) {
            throw 'Password too short.';
        }

        const user = await register(email, firstName, lastName, password);


        const token = verifyToken(user);
        res.cookie('user', token);
        res.redirect('/');

    } catch (error) {
        res.render('register', { user: req.user, body: req.body, error: errorParser(error) });
    }
});


authController.get('/closed', isUser, async (req, res) => {
    const closed = await closedAuctions();
    res.render('closed-auctions', { user: req.user, closed })
});



authController.get('/logout', isUser, (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
});

module.exports = authController;