const registerController = require('express').Router();
const bcrypt = require('bcrypt');

const { createUser, isUsernameTaken } = require('../services/userService');


registerController.get('/', (req, res) => res.render('register', { title: 'Register', user: req.user }));


registerController.post('/', async (req, res) => {
    try {
        if (req.body.username == '' || req.body.password == '' || req.body.repeatPassword == '') {
            throw new Error('All fields are required.');
        }

        if (req.body.password != req.body.repeatPassword) {
            throw new Error('Passwords must match.');
        }
        if (await isUsernameTaken(req.body.username) == true) {
            throw new Error('Username already exist.');
        }

        const hashPass = await bcrypt.hash(req.body.password, 10);

        await createUser(req.body.username, hashPass);

        res.redirect('/');

    } catch (error) {
        res.render('register', { title: 'Register', user: req.user, error: error.message });
    }
});

module.exports = registerController;