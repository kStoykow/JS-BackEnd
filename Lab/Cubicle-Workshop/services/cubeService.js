const Cube = require('../models/Cube');

async function getAllCubes() {
    const cubes = await Cube.find({}).lean();
    return cubes;
}

async function getCubeById(id) {
    const cube = await Cube.findOne({}).where('_id').equals(id).lean();
    return cube;
}

async function createCube(data) {
    const cube = await Cube.create(data);
    return cube;
}

async function getCubeAccessory(cubeId) {
    const accessory = await Cube.findOne({}).where('_id').equals(cubeId).populate('accessories');
    return accessory;

}

module.exports = {
    getAllCubes,
    getCubeById,
    createCube,
    getCubeAccessory
}