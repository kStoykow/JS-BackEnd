const defaultController = require('express').Router();

defaultController.all('/', (req, res) => res.render('404', { title: 'Page Not Found' }));

module.exports = defaultController;