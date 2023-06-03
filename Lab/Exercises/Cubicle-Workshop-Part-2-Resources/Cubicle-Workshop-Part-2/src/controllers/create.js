const { createCube } = require('../services/cubeService');

const createController = require('express').Router();

createController.get('/', async (req, res) => {
    const cubeData = { name: 'qwe', description: 'qweewe', imageUrl: 'asd', difficultyLevel: 4 };
    await createCube(cubeData);
    res.render('create');
});

module.exports = createController;