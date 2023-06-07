const deleteController = require('express').Router();

const { findCubeById } = require('../services/cubeService');

deleteController.get('/:cubeId', async (req, res) => {
    const cube = await findCubeById(req.params.cubeId);

    res.render('editCube', { cube });
});

module.exports = deleteController;