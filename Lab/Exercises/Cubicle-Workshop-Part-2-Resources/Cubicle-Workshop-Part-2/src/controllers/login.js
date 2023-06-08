const { login, verifyToken } = require('../services/userService');

const loginController = require('express').Router();

loginController.get('/', async (req, res) => res.render('login'));

loginController.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const tokenData = await login(username, password);
        await verifyToken(req, res, tokenData);

        res.redirect('/');

    } catch (error) {
        console.log(error);
        res.render('login');
    }
});

module.exports = loginController;