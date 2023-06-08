const { logout } = require('../services/userService');

const logoutController = require('express').Router();

logoutController.get('/', (req, res) => logout(req, res).then(() => res.redirect('/')));

module.exports = logoutController;
