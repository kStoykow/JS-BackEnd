const isUser = require('../middleware/isUserGuard');
const { createCube } = require('../services/cubeService');

const createController = require('express').Router();

createController.get('/', isUser, async (req, res) => res.render('create', { user: req.user }));

createController.post('/', isUser, async (req, res) => {
    console.log(req.user);
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
        res.redirect('/create');
    }
});

module.exports = createController;