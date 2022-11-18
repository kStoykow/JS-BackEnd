const Cube = require('../models/Cube');

async function getAllCubes() {
    const cubes = await Cube.find().lean();
    return cubes;
}

async function getCubeById(id) {
    const cube = await Cube.findOne().where('_id').equals(id).lean();
    return cube;
}

async function createCube(data) {
    const cube = new Cube(data);
    await cube.save();
    return cube;
}

module.exports = {
    getAllCubes,
    getCubeById,
    createCube
}