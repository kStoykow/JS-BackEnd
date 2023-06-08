const { findCubes } = require('../services/cubeService');
const { verifyToken } = require('../services/userService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    try {
        await verifyToken(req, res, req.cookies.user);

        const { search, from, to } = req.query;

        const cubes = await findCubes(search, from, to);
        res.render('home', { cubes, search, from, to });

    } catch (err) {
        res.redirect('/'); //logout
    }
});

module.exports = homeController;