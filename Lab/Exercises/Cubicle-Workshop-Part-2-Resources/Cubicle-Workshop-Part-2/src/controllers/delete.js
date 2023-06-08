const deleteController = require('express').Router();

const { findCubeById } = require('../services/cubeService');

deleteController.get('/:cubeId', async (req, res) => {
    const cube = await findCubeById(req.params.cubeId);
    const difficultyMap = {
        '1': `1 - Very Easy`,
        '2': `2 - Easy`,
        '3': `3 - Medium (Standard 3x3)`,
        '4': `4 - Intermediate`,
        '5': `5 - Expert`,
        '6': `6 - Hardcore`
    }

    const difficultyString = difficultyMap[cube.difficulty];
    res.render('deleteCube', { cube, difficulty: difficultyString,user: req.user });
});

module.exports = deleteController;