const loginController = require('express').Router();
const { body, validationResult } = require('express-validator');

const { login } = require('../services/userService');
const { errorParser } = require('../utils/parser');

loginController.get('/', (req, res) => res.render('login', { title: 'Login', user: req.user }));

loginController.post('/',
    body(['username', 'password']).trim(),
    body('username').notEmpty().withMessage('Username is required.'),
    body('password').isLength(3).withMessage('Password must be atleast 3 characters long.'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const token = await login(req.body.username, req.body.password);
            res.cookie('token', token);

            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.render('login', { title: 'Login', body: req.body, user: req.user, error: errorParser(error) });
        }

    }
);

module.exports = loginController;