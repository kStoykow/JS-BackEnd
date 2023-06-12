const { findCubeById } = require('../services/cubeService');

const detailsController = require('express').Router();

detailsController.get('/:cubeId', async (req, res) => {
    const cube = await findCubeById(req.params.cubeId);
    const isOwner = req.user.id == cube.creatorId;

    res.render('details', { cube, user: req.user, isOwner });
});

module.exports = detailsController;