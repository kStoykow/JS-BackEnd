const aboutController = require('express').Router();

aboutController.get('/', async (req, res) => res.render('about', { title: 'About Page' ,user: req.user}));

module.exports = aboutController;