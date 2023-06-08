const aboutController = require('express').Router();

aboutController.get('/', (req, res) => res.render('about',{user: req.user}));

module.exports = aboutController;