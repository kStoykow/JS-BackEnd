const editController = require('express').Router();
const isUser = require('../middleware/isUserGuard');

const { findCubeById, editCube } = require('../services/cubeService');

editController.get('/:cubeId', isUser, async (req, res) => {
    try {
        const cube = await findCubeById(req.params.cubeId);
        const isOwner = req.user.id == cube.creatorId;

        if (isOwner) {
            return res.render('editCube', { cube, user: req.user });
        }

        res.redirect('/');

    } catch (error) {
        res.redirect('/404');
    }

});

editController.post('/:cubeId', isUser, async (req, res) => {
    await editCube(req.params.cubeId, req.body);

    res.redirect(`/details/${req.params.cubeId}`);
});

module.exports = editController;