const Cube = require('../models/Cube');

async function createCube(data) {
    return Cube.create(data);
}

async function findCubes() {
    return Cube.find().lean();
}

async function detailsCube(id) {
    return Cube.findById(id).lean();
}

module.exports = {
    createCube,
    findCubes,
    detailsCube
}