const { getCubeById, editCube } = require('../services/cubeService');

const editController = require('express').Router();

editController.get('/:id', async (req, res) => {
    try {
        const cube = await getCubeById(req.params.id);

        if (req.user.id != cube.creatorId) {
            res.render('404', { title: '', user: req.user, code: 403, message: 'You don\'t have permission for this page.' });
        } else {
            res.render('edit', { title: 'Edit Cube', user: req.user, cube, user: req.user });
        }

    } catch (error) {
        res.render('404', { title: 'Cube not found', user: req.user, code: '404', message: 'Page not found.' });
    }
});

editController.post('/:id', async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty: req.body.difficultyLevel
        }

        await editCube(req.params.id, data);
        res.redirect('/details/' + req.params.id);

    } catch (error) {
        const cube = await getCubeById(req.params.id);

        res.render('edit', { title: 'Edit Cube', cube, user: req.user, error: error.message });
    }
});

module.exports = editController;