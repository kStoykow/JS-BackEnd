const { register } = require('../services/userService');

const registerController = require('express').Router();

registerController.get('/', (req, res) => res.render('register'));

registerController.post('/', async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    
    if (username && password == repeatPassword) {
        await register(username, password);
        res.redirect('/');
    } else {
        res.render('register');
    }
});

module.exports = registerController;