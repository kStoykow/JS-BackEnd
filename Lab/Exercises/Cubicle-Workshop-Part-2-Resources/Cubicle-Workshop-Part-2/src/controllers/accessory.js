const { findCubeById } = require('../services/cubeService');
const { getAvailableAccessories, attachAccessory } = require('../services/accessoryService');

const accessoryController = require('express').Router();

accessoryController.get('/create', (req, res) => res.render('createAccessory'));

accessoryController.get('/attach/:id', async (req, res) => {
    const cube = await findCubeById(req.params.id);
    const accessories = await getAvailableAccessories(cube);

    res.render('attachAccessory', { cube, accessories });
});

accessoryController.post('/attach/:id', async (req, res) => {
    const cube = await findCubeById(req.params.id);
    await attachAccessory(req.params.id, req.body.accessory);

    res.redirect(`/details/${cube._id}`);

});

module.exports = accessoryController;