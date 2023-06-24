const homeController = require('express').Router();

const { findAll } = require('../services/resourceService');
const errorParser = require('../util/errorParser');


homeController.get('/', async (req, res) => {
    try {
        const coins = await findAll();
        res.render('home', { user: req.user, coins });
    } catch (error) {
        res.render('home', { user: req.user, body: req.body, error: errorParser(error) });
    }
});

module.exports = homeController;