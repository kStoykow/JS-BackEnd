const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

async function createAccessory(data) {
    const accessory = await Accessory.create(data);
    return accessory;
}

async function attachAccessory(accessoryName, cubeName) {
    const accessory = await Accessory.findOne({}).where('name').equals(accessoryName);
    const cube = await Cube.findOne({}).where('name').equals(cubeName);
    accessory.cubes.push(cube);
    cube.accessories.push(accessory);
    await accessory.save();
    await cube.save();
}


async function cubeAvailableAccessory(cubeId) {
    return await Accessory.find({}).where('cubes').ne(cubeId);
}
module.exports = {
    createAccessory,
    attachAccessory,
    cubeAvailableAccessory
}