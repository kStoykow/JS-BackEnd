const registerController = require('express').Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const { createUser, isUsernameTaken } = require('../services/userService');
const { errorParser } = require('../utils/parser');

registerController.get('/', (req, res) => res.render('register', { title: 'Register', user: req.user }));


registerController.post('/',
    body(['username', 'password', 'repeatPassword']).trim(),
    body('username').notEmpty().withMessage('Username is required.'),
    body('password').isLength({ min: 3 }).withMessage('Password length must be atleast 3.'),
    body('repeatPassword').notEmpty().withMessage('All fields are required.'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            if (req.body.password != req.body.repeatPassword) {
                throw new Error('Passwords must match.');
            }
            if (await isUsernameTaken(req.body.username) == true) {
                throw new Error('Username already exist.');
            }

            const hashPass = await bcrypt.hash(req.body.password, 10);

            await createUser(req.body.username, hashPass);

            res.redirect('/register');

        } catch (error) {
            res.render('register', { title: 'Register', body: req.body, user: req.user, error: errorParser(error) });
        }
    });

module.exports = registerController;