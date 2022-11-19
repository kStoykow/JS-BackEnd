const Cube = require('../models/Cube');

async function searchCubes(name, from, to) {
    const regex = new RegExp(name, 'gim');
    if (from == '') {
        from = 0;
    }
    if (to == '') {
        to = 6;
    }

    return Cube.find({ 'name': { $regex: regex } }).where('difficulty').gte(from).lte(to).lean();
    // return cubes;
}

async function getCubeById(id) {
    return Cube.findOne({}).where('_id').equals(id).lean();
    // return cube;
}

async function createCube(data) {
    return Cube.create(data);
    // return cube;
}

async function getCubeAccessory(cubeId) {
    return Cube.findOne({}).where('_id').equals(cubeId).populate('accessories');
    // return accessory;

}

module.exports = {
    searchCubes,
    getCubeById,
    createCube,
    getCubeAccessory
}