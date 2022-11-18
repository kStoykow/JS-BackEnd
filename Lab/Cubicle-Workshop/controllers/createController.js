const createController = require('express').Router();

const { createCube } = require('../services/cubeService');

createController.get('/', async (req, res) => res.render('create', { title: 'Create Cube Page' }));

createController.post('/', async (req, res) => {
    const newCube = { name: req.body.name, description: req.body.description, imageUrl: req.body.imageUrl, difficulty: Number(req.body.difficultyLevel) }
    try {
        const cube = await createCube(newCube);
        res.redirect('/details/' + cube._id);

    } catch (err) {
        console.log(err); // make specific page for wrong info
        res.render('404');
    }
});

module.exports = createController;