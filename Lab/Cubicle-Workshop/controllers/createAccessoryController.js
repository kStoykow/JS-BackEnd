const createAccessoryController = require('express').Router();

const { createAccessory } = require('../services/accessoryService');

createAccessoryController.get('/', async (req, res) => {
    res.render('accessory', { title: 'Create Accessory', user: req.user })
});

createAccessoryController.post('/', async (req, res) => {
    try {
        const newAccesory = { name: req.body.name, description: req.body.description, imageUrl: req.body.imageUrl };
        await createAccessory(newAccesory);

        res.redirect('/');

    } catch (error) {
        res.render('404');
    }
});


module.exports = createAccessoryController;