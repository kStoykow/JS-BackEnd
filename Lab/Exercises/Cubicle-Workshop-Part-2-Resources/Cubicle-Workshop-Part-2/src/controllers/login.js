const { login, attachToken } = require('../services/userService');

const loginController = require('express').Router();

loginController.get('/', async (req, res) => res.render('login'));

loginController.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const tokenData = await login(username, password);
        await attachToken(req, res, tokenData);
        res.redirect('/');

    } catch (error) {
        res.render('login', { user: req.user });
    }
});

module.exports = loginController;