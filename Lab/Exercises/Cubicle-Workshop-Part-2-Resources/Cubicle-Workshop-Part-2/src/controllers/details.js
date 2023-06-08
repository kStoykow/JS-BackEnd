const { findCubeById } = require('../services/cubeService');

const detailsController = require('express').Router();

detailsController.get('/:cubeId', async (req, res) => {
    const cube = await findCubeById(req.params.cubeId);
    res.render('details', { cube ,user: req.user});
});

module.exports = detailsController;