const Cube = require('../models/Cube');

async function createCube(data) {
    return await Cube.create(data);
}

async function findCubes() {
    return Cube.find().lean();
}

async function findCubeById(id) {
    return Cube.findById(id).populate('accessories').lean();
}

module.exports = {
    createCube,
    findCubes,
    findCubeById,
}