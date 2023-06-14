const detailsController = require('express').Router();

const { findCubeById } = require('../services/cubeService');
const errorParser = require('../util/errorParser');


detailsController.get('/:cubeId', async (req, res) => {
    try {
        const cube = await findCubeById(req.params.cubeId);
        const isOwner = req.user.id == cube.creatorId;

        res.render('details', { cube, user: req.user, isOwner });
    } catch (error) {
        res.render('404', { user: req.user, error: errorParser(error) });
    }

});

module.exports = detailsController;