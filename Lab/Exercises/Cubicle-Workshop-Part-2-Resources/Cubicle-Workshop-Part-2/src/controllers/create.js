const { createCube } = require('../services/cubeService');

const createController = require('express').Router();

createController.get('/', async (req, res) => res.render('create', { user: req.user }));

createController.post('/', async (req, res) => {
    const cubeData = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: Number(req.body.difficulty),
        creatorId: req.user.id
    }

    const cube = await createCube(cubeData);
    res.redirect('/details/' + cube._id);
});

module.exports = createController;