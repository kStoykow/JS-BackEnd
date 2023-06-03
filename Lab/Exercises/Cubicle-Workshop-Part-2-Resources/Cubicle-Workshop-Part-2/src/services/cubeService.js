const Cube = require('../models/Cube');

async function createCube(data) {
    return Cube.create(data);
}

async function findCubes() {
    return Cube.find();
}

module.exports = {
    createCube,
    findCubes
}