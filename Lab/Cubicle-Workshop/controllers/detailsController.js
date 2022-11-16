const detailsController = require('express').Router();

const { getById } = require('../controllers/cubeController');

detailsController.get('/:id', (req, res) => {
    const cube = getById(req.params.id);
    if (cube != undefined) {
        res.render('details', { title: 'Cubicle', cube });
    } else {
        res.render('404');
    }
});

module.exports = detailsController;