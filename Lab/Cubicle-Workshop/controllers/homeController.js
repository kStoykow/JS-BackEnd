const homeController = require('express').Router();

const { getAllCubes } = require('../services/cubeService');

homeController.get('/', async (req, res) => {
    const { search, from, to } = req.query;
    const cubes = await getAllCubes();

    res.render('home', { title: 'Cubicle', cubes, search, from, to });
});

module.exports = homeController;