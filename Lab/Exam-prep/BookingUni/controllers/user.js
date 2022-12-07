const jwt = require('jsonwebtoken');
const user = require('express').Router();

const secretKey = 'qwe';

const { login, register } = require('../services/user');


user.get('/login', (req, res) => {
    res.render('login');
});

user.post('/login', async (req, res) => {
    try {
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required.');
        }

        const userData = await login(req.body.username, req.body.password); // TODO check login req;

        const payload = {
            username: req.body.username,
            id: userData._id
        }

        const token = jwt.sign(payload, secretKey);
        res.cookie('token', token); // TODO check token name;

        res.redirect('/'); // TODO Check redirect.
    } catch (error) {
        console.log(error.message, 'error login');
        res.render('login', { title: 'Login', body: req.body, errors: error });
    }
});

user.get('/register', (req, res) => {
    res.render('register');
});


user.post('/register', async (req, res) => {
    try {
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required.');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords must match.');
        }

        const user = await register(req.body.username, req.body.password); // TODO check register req;
        // TODO Check if user should be logged in at registration.
        const payload = {
            id: user._id,
            username: req.body.username
        }

        const token = jwt.sign(payload, secretKey);
        res.cookie('token', token); // TODO check token name;

        res.redirect('/'); //TODO check redirect;
    } catch (error) {
        console.log(error.message, 'error register');
        res.render('register', { title: 'Register', body: req.body, errors: error });
    }
});




user.get('/logout', (req, res) => {
    res.clearCookie('token'); // TODO check cookie name
    res.redirect('/');
});

module.exports = user;