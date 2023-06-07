const { detailsCube } = require('../services/cubeService');

const detailsController = require('express').Router();

detailsController.get('/:cubeId', async (req, res) => {
    const cube = await detailsCube(req.params.cubeId);
    console.log(cube.accessories);
    res.render('details', { cube });
});

module.exports = detailsController;