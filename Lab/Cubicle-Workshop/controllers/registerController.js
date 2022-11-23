const registerController = require('express').Router();

const { createUser } = require('../services/userService');


registerController.get('/', (req, res) => res.render('register'));


registerController.post('/', async (req, res) => {
    //verify
    try {
        await createUser(req.body.username, req.body.password);

        res.redirect('/');

    } catch (error) {
        res.render('404');
    }
});

module.exports = registerController;