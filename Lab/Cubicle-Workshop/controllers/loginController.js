const loginController = require('express').Router();

const { login } = require('../services/userService');

loginController.get('/', (req, res) => res.render('login', { title: 'Login', user: req.user }));

loginController.post('/', async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);
        res.cookie('token', token);

        res.redirect('/');
    } catch (error) {
        res.render('login', { title: 'Login', user: req.user, error: error.message });
    }

}
);

module.exports = loginController;