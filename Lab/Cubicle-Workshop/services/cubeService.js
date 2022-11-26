const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

const difficultyMap = {
    '1': '1 - Very Easy',
    '2': '2 - Easy',
    '3': '3 - Medium (Standard 3x3)',
    '4': '4 - Intermediate',
    '5': '5 - Expert',
    '6': '6 - Hardcore'
}

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
    return Cube.findById(cubeId).populate('accessories').lean();
}

async function editCube(cubeId, data) {
    const cube = await Cube.findById(cubeId);

    for (const key in data) {
        cube[key] = data[key];
    }

    await cube.save();
}

async function deleteCube(id) {
    const cube = await Cube.findById(id).populate('accessories');
    const accessories = await Accessory.find({ '_id': { $in: cube.accessories } });
    console.log(accessories, ' before');
    accessories.forEach(async e => {
        await Accessory.findOneAndRemove({ '_id': e._id });// TODO: finish remove. Previous one deleted documents from db not refferences
    });
    console.log(accessories, ' afetr');

    // await Cube.deleteOne({}).where('_id').equals(id);
}

module.exports = {
    searchCubes,
    getCubeById,
    createCube,
    getCubeAccessory,
    editCube,
    deleteCube,
    difficultyMap
}



// KIDDORI

// Description: Perfect cube for kids between 2-6 y.o.

// Difficulty level: 1 - Very Easy