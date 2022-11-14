const fs = require('fs');

const cubes = JSON.parse(fs.readFileSync('./config/database.json').toString());

function saveCube(cube) {
    fs.writeFileSync('../config/database.json', JSON.stringify(cube, null, 2));
}

function getCubes() {
    return cubes;
}

function getById(id) {
    return cubes.find(e => e.id == id);
}
module.exports = { saveCube, getCubes, getById };