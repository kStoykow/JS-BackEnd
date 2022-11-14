const { getCubes } = require('./cubeController');

function homeController(req, res) {
    const cubes = getCubes();
    res.render('home', { title: 'Cubicle', cubes });
}

module.exports = homeController;