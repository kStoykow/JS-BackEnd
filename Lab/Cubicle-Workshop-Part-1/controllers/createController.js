const createId = require('uniqid');
const cubeModel = require('../models/cubeModel');
const { saveCube } = require('./cubeController');

const createGetController = (req, res) => res.render('create', { title: 'Create Cube Page' });

const createPostController = (req, res) => {
    const id = createId();
    const cube = cubeModel(id, req.body.name, req.body.description, req.body.imageUrl, Number(req.body.difficultyLevel));
    saveCube(cube);
    res.redirect('/details/' + id);
}

module.exports = { createGetController, createPostController };