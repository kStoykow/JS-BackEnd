const homeController = require('express').Router();

const { searchCubes } = require('../services/cubeService');

homeController.get('/', async (req, res) => {
    const search = req.query.search || '';
    const from = req.query.from || '';
    const to = req.query.to || '';

    try {
        const cubes = await searchCubes(search, from, to);

        res.render('home', { title: 'Cubicle', user: req.user, cubes, search, from, to });
    } catch (error) {
        res.render('404', { title: 'Not found', code: 404, message: 'Page not found.' });
    }
});

module.exports = homeController;