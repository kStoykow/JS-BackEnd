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

async function getCubeAccessory(id) {
    const asd = await Cube.find({}).where('_id').equals(id);
    console.log(asd);
}

module.exports = {
    getAllCubes,
    getCubeById,
    createCube,
    getCubeAccessory
}