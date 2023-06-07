const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

async function createCube(data) {
    return await Cube.create(data);
}

async function findCubes() {
    return Cube.find().lean();
}

async function detailsCube(id) {
    return Cube.findById(id).populate('accessories').lean();
}

module.exports = {
    createCube,
    findCubes,
    detailsCube
}