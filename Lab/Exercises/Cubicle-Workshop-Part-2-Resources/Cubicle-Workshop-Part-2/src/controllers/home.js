const { findCubes } = require('../services/cubeService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {

    const { search, from, to } = req.query;

    try {
        const cubes = await findCubes(search, from, to);
        res.render('home', { cubes, user: req.user, search, from, to });

    } catch (error) {
        res.render('404', { user: req.user, error: errorParser(error) });
    }
});

module.exports = homeController;