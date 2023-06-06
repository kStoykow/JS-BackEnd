const { createCube } = require('../services/cubeService');

const createController = require('express').Router();

createController.get('/', async (req, res) => res.render('create'));

createController.post('/', async (req, res) => {
    const cubeData = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: Number(req.body.difficultyLevel),
    }

    const cube = await createCube(cubeData);
    res.redirect('/details/' + cube._id);
});

module.exports = createController;