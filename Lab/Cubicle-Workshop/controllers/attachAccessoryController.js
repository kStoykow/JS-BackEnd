const attachAccessoaryController = require('express').Router();

const { getCubeById } = require('../services/cubeService');
const { attachAccessory, cubeAvailableAccessory } = require('../services/accessoryService');

attachAccessoaryController.get('/:id', async (req, res) => {
    try {
        const cube = await getCubeById(req.params.id);
        const accessories = await cubeAvailableAccessory(req.params.id);

        res.render('attach', { title: 'Attach Accessory', cube, accessories });

    } catch (error) {
        res.render('404');
    }
});


attachAccessoaryController.post('/:id', async (req, res) => {
    const accessoryName = req.body.accessory;

    try {
        const cube = await getCubeById(req.params.id);

        await attachAccessory(accessoryName, cube.name);

        res.redirect('/details/' + cube._id);

    } catch (error) {
        res.render('404');
    }
});


module.exports = attachAccessoaryController;