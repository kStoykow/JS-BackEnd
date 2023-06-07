const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

async function getAvailableAccessories(cube) {
    return Accessory.find({ _id: { $nin: cube.accessories } }).lean();
}

async function attachAccessory(cubeId, accessoryId) {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId).lean();
    cube.accessories.push(accessory);
    await cube.save();
}

async function createAccessory(data) {
    return Accessory.create(data);
}

module.exports = {
    getAvailableAccessories,
    attachAccessory,
    createAccessory
}