const accessoryController = require('express').Router();


const { findCubeById } = require('../services/cubeService');
const { getAvailableAccessories, attachAccessory, createAccessory } = require('../services/accessoryService');
const isUser = require('../middleware/isUserGuard');
const errorParser = require('../util/errorParser');


accessoryController.get('/create', isUser, (req, res) => res.render('createAccessory', { user: req.user }));

accessoryController.post('/create', isUser, async (req, res) => {
    const accessoryData = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
    }

    try {
        await createAccessory(accessoryData);
        res.redirect('/');

    } catch (error) {
        res.render('createAccessory', { user: req.user, data: accessoryData, error: errorParser(error) });
    }
});


accessoryController.get('/attach/:id', isUser, async (req, res) => {
    try {
        const cube = await findCubeById(req.params.id);
        const accessories = await getAvailableAccessories(cube);

        res.render('attachAccessory', { cube, accessories, user: req.user });

    } catch (error) {
        res.render('404', { user: req.user, error: errorParser(error) });
    }
});

accessoryController.post('/attach/:id', isUser, async (req, res) => {
    try {
        const cube = await findCubeById(req.params.id);
        await attachAccessory(req.params.id, req.body.accessory);

        res.redirect(`/details/${cube._id}`);

    } catch (error) {
        res.render('404', { user: req.user, error: errorParser(error) });
    }
});

module.exports = accessoryController;