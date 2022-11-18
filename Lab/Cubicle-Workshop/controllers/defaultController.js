const defaultController = require('express').Router();

defaultController.all('/', async (req, res) => res.render('404', { title: 'Page Not Found' }));

module.exports = defaultController;