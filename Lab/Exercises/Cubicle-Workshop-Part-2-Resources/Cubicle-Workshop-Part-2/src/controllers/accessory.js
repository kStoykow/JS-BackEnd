const { findCubeById } = require('../services/cubeService');
const { getAvailableAccessories, attachAccessory, createAccessory } = require('../services/accessoryService');
const isUser = require('../middleware/isUserGuard');

const accessoryController = require('express').Router();

accessoryController.get('/create', isUser, (req, res) => res.render('createAccessory', { user: req.user }));

accessoryController.post('/create', isUser, async (req, res) => {
    const accessoryData = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
    }

    await createAccessory(accessoryData);
    res.redirect('/');
});


accessoryController.get('/attach/:id', isUser, async (req, res) => {
    const cube = await findCubeById(req.params.id);
    const accessories = await getAvailableAccessories(cube);

    res.render('attachAccessory', { cube, accessories, user: req.user });
});

accessoryController.post('/attach/:id', isUser, async (req, res) => {
    const cube = await findCubeById(req.params.id);
    await attachAccessory(req.params.id, req.body.accessory);

    res.redirect(`/details/${cube._id}`);

});

module.exports = accessoryController;