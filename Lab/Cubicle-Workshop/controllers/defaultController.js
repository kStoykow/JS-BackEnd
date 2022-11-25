const defaultController = require('express').Router();

defaultController.all('/', async (req, res) => res.render('404', {
    title: 'Page Not Found',
    user: req.user,
    code: 404,
    message: 'Page not found.'
}));

module.exports = defaultController;