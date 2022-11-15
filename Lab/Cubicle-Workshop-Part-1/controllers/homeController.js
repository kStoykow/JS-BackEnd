const { getCubes, searchCube } = require('./cubeController');

function homeController(req, res) {
    const { search, from, to } = req.query;
    let cubes = getCubes();
    const found = searchCube(cubes, search, from, to);

    if (found.length == 0) {
        res.render('home', { title: 'Cubicle', cubes, search, from, to });
    } else {
        res.render('home', { title: 'Cubicle', cubes: found, search, from, to });
    }
}

module.exports = homeController;