const isUser = require('../middleware/isUserGuard');
const { createCube } = require('../services/cubeService');
const errorParser = require('../util/errorParser');

const createController = require('express').Router();

createController.get('/', isUser, async (req, res) => res.render('create', { user: req.user }));

createController.post('/', isUser, async (req, res) => {
    const cubeData = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: Number(req.body.difficulty),
        creatorId: req.user.id
    }

    try {
        const cube = await createCube(cubeData);
        res.redirect('/details/' + cube._id);

    } catch (error) {
        res.render('create', { user: req.user, error: errorParser(error), data: cubeData });
    }
});

module.exports = createController;