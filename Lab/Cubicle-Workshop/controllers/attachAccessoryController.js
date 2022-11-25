const attachAccessoaryController = require('express').Router();

const { getCubeById } = require('../services/cubeService');
const { attachAccessory, cubeAvailableAccessory } = require('../services/accessoryService');

attachAccessoaryController.get('/:id', async (req, res) => {
    try {
        const cube = await getCubeById(req.params.id);
        const accessories = await cubeAvailableAccessory(req.params.id);
        res.render('attach', { title: 'Attach Accessory', user: req.user, cube, accessories });

    } catch (error) {
        res.render('404', { title: 'Attach Accessory', user: req.user, code: 404, message: 'Something went wrong. Try again later.' });
    }
});


attachAccessoaryController.post('/:id', async (req, res) => {
    const accessoryName = req.body.accessory;

    try {
        await attachAccessory(accessoryName, req.params.id);

        res.redirect('/details/' + req.params.id);

    } catch (error) {
        res.render('404', { title: 'Attach Accessory', user: req.user, code: 404, message: 'Something went wrong. Try again later.' });
    }
});


module.exports = attachAccessoaryController;