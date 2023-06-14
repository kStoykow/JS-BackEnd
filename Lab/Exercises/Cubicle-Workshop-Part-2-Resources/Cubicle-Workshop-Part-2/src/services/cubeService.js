const Cube = require('../models/Cube');

async function createCube(data) {
    try {
        return Cube.create(data);
    } catch (error) {
        throw 'Something went wrong. Please try again later.';
    }
}

async function findCubes(name, from, to) {
    if (!from) {
        from = 1;
    }
    if (!to) {
        to = 6;
    }

    const regex = new RegExp(name, 'gim');

    try {
        return await Cube.find({ name: regex, difficulty: { $gte: from, $lte: to } }).lean();
    } catch (error) {
        throw 'Something went wrong. Please try again later.';
    }
}

async function findCubeById(id) {
    try {
        return await Cube.findById(id).populate('accessories').lean();

    } catch (error) {
        throw 'Something went wrong. Please try again later.';
    }
}

const editCube = async function (cubeId, data) {
    try {
        const cube = await Cube.findById(cubeId);
        for (const key in cube) {
            if (data.hasOwnProperty(key))
                cube[key] = data[key];
        }

        await cube.save();

    } catch (error) {
        throw 'Something went wrong. Please try again later.';
    }
}
const deleteCube = async function (cubeId) {
    await Cube.findByIdAndDelete(cubeId);
}

module.exports = {
    createCube,
    findCubes,
    findCubeById,
    editCube,
    deleteCube
}