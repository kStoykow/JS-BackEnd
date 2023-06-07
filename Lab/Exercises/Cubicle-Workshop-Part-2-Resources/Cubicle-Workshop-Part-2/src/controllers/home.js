const { findCubes } = require('../services/cubeService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const { search, from, to } = req.query;

    const cubes = await findCubes(search, from, to);
    res.render('home', { cubes, search, from, to });
});

module.exports = homeController;