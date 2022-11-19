const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

async function createAccessory(data) {
    const accessory = await Accessory.create(data);
    return accessory;
}

async function attachAccessory(accessoryName, cubeId) {
    const accessory = await Accessory.findOne({}).where('name').equals(accessoryName);
    const cube = await Cube.findOne({}).where('_id').equals(cubeId);
    accessory.cubes.push(cube);
    cube.accessories.push(accessory);
    await accessory.save();
    await cube.save();
}


async function cubeAvailableAccessory(cubeId) {
    return Accessory.find({}).where('cubes').ne(cubeId);
}
module.exports = {
    createAccessory,
    attachAccessory,
    cubeAvailableAccessory
}