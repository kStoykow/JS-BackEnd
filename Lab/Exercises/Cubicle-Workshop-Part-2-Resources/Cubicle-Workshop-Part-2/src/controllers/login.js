const isGuest = require('../middleware/isGUestGuard');
const { login, attachToken } = require('../services/userService');
const errorParser = require('../util/errorParser');

const loginController = require('express').Router();

loginController.get('/', isGuest, async (req, res) => res.render('login'));

loginController.post('/', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        const tokenData = await login(username, password);
        await attachToken(req, res, tokenData);
        res.redirect('/');

    } catch (error) {
        res.render('login', { user: req.user, error: errorParser(error) });
    }
});

module.exports = loginController;