const defaultController = require('express').Router();


defaultController.get('/', (req, res) => res.render('default', { user: req.user }));

module.exports = defaultController;