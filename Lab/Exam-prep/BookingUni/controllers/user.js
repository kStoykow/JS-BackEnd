const user = require('express').Router();

const { isUser } = require('../middlewares/guards');
const { login, register } = require('../services/user');
const { parseError } = require('../util/errorParser');


user.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

user.post('/login', async (req, res) => {
    try {
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required.');
        }

        const token = await login(req.body.username, req.body.password);
        res.cookie('token', token);
        res.redirect('/');

    } catch (error) {
        const errors = parseError(error);
        res.render('login', { title: 'Login', body: req.body, error: errors });
    }
});


user.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

user.post('/register', async (req, res) => {
    try {
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required.');
        }
        if (req.body.password != req.body.rePassword) {
            throw new Error('Passwords must match.');
        }

        const token = await register(req.body.email, req.body.username, req.body.password);
        res.cookie('token', token);
        res.redirect('/');

    } catch (error) {
        const errors = parseError(error);
        res.render('register', { title: 'Register', body: req.body, error: errors });
    }
});


user.get('/logout', isUser, (req, res) => {
    res.clearCookie('token'); // TODO check cookie name
    res.redirect('/');
});

module.exports = user;