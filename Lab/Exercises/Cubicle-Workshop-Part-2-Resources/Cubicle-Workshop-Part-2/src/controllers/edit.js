const editController = require('express').Router();

const { findCubeById, editCube } = require('../services/cubeService');

editController.get('/:cubeId', async (req, res) => {
    const cube = await findCubeById(req.params.cubeId);

    res.render('editCube', { cube, user: req.user });
});

editController.post('/:cubeId', async (req, res) => {
    await editCube(req.params.cubeId, req.body);

    res.redirect(`/details/${req.params.cubeId}`);
});

module.exports = editController;