const { getById } = require('../controllers/cubeController');

function detailsController(req, res) {
    const cube = getById(req.params.id);
    console.log(cube);
    res.render('details', { title: 'Cubicle', cube });
}

module.exports = detailsController;