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
}

async function getCubeById(id) {
    return Cube.findOne({}).where('_id').equals(id).lean();

}

async function createCube(data) {
    return Cube.create(data);
}

async function getCubeAccessory(cubeId) {
    return Cube.findOne({}).where('_id').equals(cubeId).populate('accessories');
}

async function editCube(cubeId, data) {
    const cube = await Cube.findById(cubeId);

    for (const key in data) {
        cube[key] = data[key];
    }

    await cube.save();
}

module.exports = {
    searchCubes,
    getCubeById,
    createCube,
    getCubeAccessory,
    editCube
}