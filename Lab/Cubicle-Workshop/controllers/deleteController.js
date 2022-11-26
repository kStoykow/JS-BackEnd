const deleteController = require('express').Router();
const { getCubeById, deleteCube, difficultyMap } = require('../services/cubeService');


deleteController.get('/:id', async (req, res) => {
    try {
        const cube = await getCubeById(req.params.id);
        cube.difficulty = difficultyMap[cube.difficulty];
        if (req.user?.id != cube.creatorId) {
            res.render('404', { title: 'Forbidden', user: req.user, code: 403, message: 'You don\'t have permission for this page.' });
        } else {
            res.render('delete', { title: 'Delete Cube', user: req.user, cube });
        }

    } catch (error) {
        res.render('404', { title: 'Cube not found', user: req.user, code: '404', message: 'Page not found.' });
    }

});

deleteController.post('/:id', async (req, res) => {
    try {
        await deleteCube(req.params.id);

        res.redirect('/');

    } catch (error) {
        res.render('404', { title: '404', user: req.user, code: 404, error: 'Something went wrong.' });
    }


});

module.exports = deleteController;