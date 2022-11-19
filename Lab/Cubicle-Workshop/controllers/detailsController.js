const detailsController = require('express').Router();

const { getCubeAccessory } = require('../services/cubeService');

detailsController.get('/:id', async (req, res) => {
    try {
        const cube = await getCubeAccessory(req.params.id);

        res.render('details', { title: 'Cubicle', cube, accessories: cube.accessories });
    } catch (error) {
        res.render('404');
    }
});

module.exports = detailsController;