const homeController = require('express').Router();

const errorParser = require('../util/errorParser');
const { findFirstThree } = require('../services/resourceService');


homeController.get('/', async (req, res) => {
    try {
        const ads = await findFirstThree();

        res.render('home', { user: req.user, ads });
    } catch (error) {
        res.render('home', { user: req.user, body: req.body, error: errorParser(error) });
    }
});

module.exports = homeController;