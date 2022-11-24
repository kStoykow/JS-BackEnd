const loginController = require('express').Router();

const { login } = require('../services/userService');

loginController.get('/', (req, res) => res.render('login', { title: 'Login', user: req.user }));

loginController.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //to finish
    try {
        const token = await login(username, password);
        res.cookie('token', token);

        res.redirect('/');
    } catch (error) {
        res.render('login', { title: 'Login', user: req.user, error: 'Wrong username or password.' });
    }

}
);

module.exports = loginController;