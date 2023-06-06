const Cube = require('../models/Cube');

async function createCube(data) {
    const cube = await Cube.create(data);
    return cube;
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