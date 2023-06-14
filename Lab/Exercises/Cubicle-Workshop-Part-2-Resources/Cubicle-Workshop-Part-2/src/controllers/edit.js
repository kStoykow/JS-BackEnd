const editController = require('express').Router();

const isUser = require('../middleware/isUserGuard');

const { findCubeById, editCube } = require('../services/cubeService');
const errorParser = require('../util/errorParser');

editController.get('/:cubeId', isUser, async (req, res) => {
    try {
        const cube = await findCubeById(req.params.cubeId);
        const isOwner = req.user.id == cube.creatorId;

        if (isOwner) {
            return res.render('editCube', { cube, user: req.user });
        }

        res.redirect('/');

    } catch (error) {
        res.render('404', {user: req.user, error: errorParser(error) });
    }

});

editController.post('/:cubeId', isUser, async (req, res) => {
    try {
        await editCube(req.params.cubeId, req.body);

        res.redirect(`/details/${req.params.cubeId}`);
    } catch (error) {
        res.render('404', {user: req.user, error: errorParser(error) });
    }
});

module.exports = editController;