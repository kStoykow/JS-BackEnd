const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

async function getAvailableAccessories(cube) {
    try {
        return await Accessory.find({ _id: { $nin: cube.accessories } }).lean();
    } catch (error) {
        throw 'Something went wrong. Please try again later.';
    }
}

async function attachAccessory(cubeId, accessoryId) {
    try {
        const cube = await Cube.findById(cubeId);
        const accessory = await Accessory.findById(accessoryId).lean();
        cube.accessories.push(accessory);
        await cube.save();

    } catch (error) {
        throw 'Something went wrong. Please try again later.';
    }
}

async function createAccessory(data) {
    try {
        return Accessory.create(data);
    } catch (error) {
        throw 'Something went wrong. Please try again later.';
    }
}

module.exports = {
    getAvailableAccessories,
    attachAccessory,
    createAccessory
}