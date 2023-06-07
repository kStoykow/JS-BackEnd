const Cube = require('../models/Cube');

async function createCube(data) {
    return await Cube.create(data);
}

async function findCubes(name, from, to) {
    if (!from) {
        from = 1;
    }
    if (!to) {
        to = 6;
    }

    const regex = new RegExp(name, 'gim');
    return Cube.find({ name: regex, difficulty: { $gte: from, $lte: to } }).lean();
}

async function findCubeById(id) {
    return Cube.findById(id).populate('accessories').lean();
}

module.exports = {
    createCube,
    findCubes,
    findCubeById,
}