const attachAccessoaryController = require('express').Router();

const { getCubeById } = require('../services/cubeService');
const { getAllAccessories, attachAccessory } = require('../services/accessoryService');

attachAccessoaryController.get('/:id', async (req, res) => {
    const cube = await getCubeById(req.params.id);
    const allAccessories = await getAllAccessories();
    const availableAccessories = allAccessories.filter(e => !cube.accessories.includes(e.name));

    res.render('attach', { title: 'Attach Accessory', cube, accessories: availableAccessories })
});


attachAccessoaryController.post('/:id', async (req, res) => {
    const accessory = req.body.accessory;
    const cube = await getCubeById(req.params.id);

    await attachAccessory(accessory, cube);

    res.render('details', { title: 'Attach Accessory' })
});


module.exports = attachAccessoaryController;