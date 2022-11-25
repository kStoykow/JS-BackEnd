const detailsController = require('express').Router();

const { getCubeAccessory } = require('../services/cubeService');

detailsController.get('/:id', async (req, res) => {

    try {
        const cube = await getCubeAccessory(req.params.id);
        const isOwner = cube.creatorId == req.user?.id;

        res.render('details', { title: 'Cubicle', cube, user: req.user, accessories: cube.accessories, isOwner });

    } catch (error) {
        res.render('404', { title: 'Not found', code: 404, message: 'Cube not found.' });
    }
});

module.exports = detailsController;