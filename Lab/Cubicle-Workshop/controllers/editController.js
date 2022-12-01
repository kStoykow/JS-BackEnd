const { getCubeById, editCube } = require('../services/cubeService');
const { errorParser } = require('../utils/parser');
const { body, validationResult } = require('express-validator');

const editController = require('express').Router();

editController.get('/:id', async (req, res) => {
    try {
        const cube = await getCubeById(req.params.id);

        if (req.user.id != cube.creatorId) {
            res.render('404', { title: 'Forbidden', user: req.user, code: 403, message: 'You don\'t have permission for this page.' });
        } else {
            res.render('edit', { title: 'Edit Cube', user: req.user, cube });
        }

    } catch (error) {
        res.render('404', { title: 'Cube not found', user: req.user, code: '404', message: 'Page not found.' });
    }
});

editController.post('/:id',
    body(['name', 'description', 'imageUrl']).trim(),
    body('name').notEmpty().withMessage('Name is required.'),
    body('description').isLength(10).withMessage('Description length is minimum 10 char.'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            await editCube(req.params.id, req.body);
            res.redirect('/details/' + req.params.id);

        } catch (error) {
            const data = { _id: req.params.id, name: req.body.name, description: req.body.description, imageUrl: req.body.imageUrl }
            res.render('edit', { title: 'Edit Cube', cube: data, user: req.user, error: errorParser(error) });
        }
    });

module.exports = editController;