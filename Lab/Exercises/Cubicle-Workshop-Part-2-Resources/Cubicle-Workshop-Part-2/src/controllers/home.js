const { findCubes } = require('../services/cubeService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const cubes = await findCubes();
    res.render('home', { cubes });
});

module.exports = homeController;