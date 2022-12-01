const cubeController = require('express').Router();
const { body, validationResult } = require('express-validator');

const { createCube } = require('../services/cubeService');
const { errorParser } = require('../utils/parser');

cubeController.get('/', async (req, res) => res.render('create', { title: 'Create Cube Page', user: req.user }));

cubeController.post('/',
    body(['name', 'description', 'imageUrl']).trim(),
    body('name').notEmpty().withMessage('Name is required.'),
    body('description').isLength(5).withMessage('Description length is minimum 5 char.'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            const cubeData = {
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                difficulty: Number(req.body.difficultyLevel),
                creatorId: req.user.id
            }

            const cube = await createCube(cubeData);
            res.redirect('/details/' + cube._id);

        } catch (error) {
            res.render('create', { title: 'Create Cube Page', user: req.user, body: req.body, error: errorParser(error) });
        }
    });

module.exports = cubeController;