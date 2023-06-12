const deleteController = require('express').Router();

const isUser = require('../middleware/isUserGuard');
const { findCubeById, deleteCube } = require('../services/cubeService');

deleteController.get('/:cubeId', isUser, async (req, res) => {
    try {
        const cube = await findCubeById(req.params.cubeId);

        const isOwner = req.user.id == cube.creatorId;

        if (isOwner) {
            const difficultyMap = {
                '1': `1 - Very Easy`,
                '2': `2 - Easy`,
                '3': `3 - Medium (Standard 3x3)`,
                '4': `4 - Intermediate`,
                '5': `5 - Expert`,
                '6': `6 - Hardcore`
            }

            const difficultyString = difficultyMap[cube.difficulty];
            return res.render('deleteCube', { cube, difficulty: difficultyString, user: req.user });
        }

        res.redirect('/');
    } catch (error) {
        res.redirect('/404');
    }


});

deleteController.post('/:cubeId', isUser, async (req, res) => {
    try {
        const cube = await findCubeById(req.params.cubeId);

        const isOwner = req.user.id == cube.creatorId;

        if (isOwner) {
            await deleteCube(req.params.cubeId);
            return res.redirect('/');
        }

        res.redirect('/404');

    } catch (error) {
        res.redirect('/404');
    }
});

module.exports = deleteController;