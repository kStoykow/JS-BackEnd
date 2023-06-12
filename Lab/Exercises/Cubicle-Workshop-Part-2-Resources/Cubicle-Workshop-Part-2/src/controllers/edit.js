const editController = require('express').Router();
const isUser = require('../middleware/isUserGuard');

const { findCubeById, editCube } = require('../services/cubeService');

editController.get('/:cubeId', isUser, async (req, res) => {
    const cube = await findCubeById(req.params.cubeId);

    res.render('editCube', { cube, user: req.user });
});

editController.post('/:cubeId', isUser, async (req, res) => {
    await editCube(req.params.cubeId, req.body);

    res.redirect(`/details/${req.params.cubeId}`);
});

module.exports = editController;