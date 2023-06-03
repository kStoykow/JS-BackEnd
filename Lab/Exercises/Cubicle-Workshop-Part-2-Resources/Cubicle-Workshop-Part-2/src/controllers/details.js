const detailsController = require('express').Router();

detailsController.get('/:cubeId', (req, res) => {

    res.render('details');
});

module.exports = detailsController;