const detailsController = require('express').Router();

const { getCubeById } = require('../services/cubeService');

detailsController.get('/:id', async (req, res) => {

    try {
        const cube = await getCubeById(req.params.id);
        res.render('details', { title: 'Cubicle', cube });

    } catch (error) {
        res.render('404');
    }
});

module.exports = detailsController;