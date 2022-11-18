const Accessory = require('../models/Accessory');

async function createAccessory(data) {
    const accessory = await Accessory.create(data);
    return accessory;
}

async function getAllAccessories() {
    const accessories = await Accessory.find().lean();
    return accessories;
}

async function attachAccessory(name, cube) {
    const accessory = await Accessory.findOne({}).where('name').equals(name, cube);

    accessory.cubes.push(cube);
    await accessory.save(); 
    
    // make relations in cube model
    // finish population of accessories cubes and search
}

module.exports = {
    createAccessory,
    getAllAccessories,
    attachAccessory
}