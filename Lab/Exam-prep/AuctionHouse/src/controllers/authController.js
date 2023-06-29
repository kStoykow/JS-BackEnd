const authController = require('express').Router();

const errorParser = require('../util/errorParser');
const isGuest = require('../middlewares/isGuest');
const isUser = require('../middlewares/isUser');
const { register, login, verifyToken } = require('../services/userService'); //delete ref if not used

//TODO: check guards

authController.get('/login', isGuest, (req, res) => res.render('login', { user: req.user }));
authController.post('/login', isGuest, async (req, res) => {
    const { username, email, password } = req.body; //TODO: check if email

    try {
        const token = await login(username, email, password);
        res.cookie('user', token);
        res.redirect('/'); //TODO: check redirect
    } catch (error) {
        res.render('login', { user: req.user, body: req.body, error: errorParser(error) }); //TODO: check if populating form
    }
});

authController.get('/register', isGuest, (req, res) => res.render('register', { user: req.user }));
authController.post('/register', isGuest, async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

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

        res.redirect('/user/login'); //TODO: check redirect OR login instant

        // const token = verifyToken(user);
        // res.cookie('user', token);
        // res.redirect('/');

    } catch (error) {
        res.render('register', { user: req.user, body: req.body, error: errorParser(error) });
    }
});


authController.get('/profile', async (req, res) => {   //TODO: check if profile needed
    try {
        const allResources = await findAll();
        // const books = allResources.filter(e => e.wishList.some(e => e == req.user._id));

        res.render('profile', { user: req.user, books: allResources });
    } catch (error) {
        res.render('default', { user: req.user, error: errorParser(error) });

    }
});


authController.get('/logout', isUser, (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
});

module.exports = authController;