const Cube = require('../models/Cube');

async function searchCubes(name, from, to) {
    const regex = new RegExp(name, 'gim');
    if (from == '') {
        from = 0;
    }
    if (to == '') {
        to = 6;
    }

    const cubes = await Cube.find({ 'name': { $regex: regex } }).where('difficulty').gte(from).lte(to).lean();
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
    searchCubes,
    getCubeById,
    createCube,
    getCubeAccessory
}