const cubeController = require('express').Router();

const { createCube } = require('../services/cubeService');

cubeController.get('/', async (req, res) => res.render('create', { title: 'Create Cube Page', user: req.user }));

cubeController.post('/', async (req, res) => {
    const cubeData = { name: req.body.name, description: req.body.description, imageUrl: req.body.imageUrl, difficulty: Number(req.body.difficultyLevel) }

    try {
        const cube = await createCube(cubeData);
        res.redirect('/details/' + cube._id);

    } catch (err) {
        res.render('404'); // could make specific page for wrong info
    }
});

module.exports = cubeController;