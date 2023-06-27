const homeController = require('express').Router();

const errorParser = require('../util/errorParser');


homeController.get('/', async (req, res) => {
    try {

        res.render('home', { user: req.user });
    } catch (error) {
        res.render('home', { user: req.user, body: req.body, error: errorParser(error) });
    }
});

module.exports = homeController;