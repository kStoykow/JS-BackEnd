const Cube = require('../models/Cube');

async function createCube(data) {
    return Cube.create(data);
}


module.exports = {
    createCube
}