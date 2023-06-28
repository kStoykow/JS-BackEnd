const resourceController = require('express').Router();
const errorParser = require('../util/errorParser');

const isUser = require('../middlewares/isUser');
const { createResource, findAll, findResourceById, editResource, deleteResource } = require('../services/resourceService');
//TODO:CHECK GUARDS
//TODO:CHECK GUARDS
//TODO: check if populating fields on wrong validation
//TODO: check if populating fields on wrong validation

resourceController.get('/create', isUser, async (req, res) => res.render('create', { user: req.user }));

resourceController.post('/create', isUser, async (req, res) => {
    try {
        const { platform, name, imageUrl, price, genre, description } = req.body;

        await createResource({ platform, name, imageUrl, price, genre, description });
        res.redirect('/games/catalog');
    } catch (error) {
        res.render('create', { user: req.user, body: req.body, error: errorParser(error) });
    }
});


resourceController.get('/catalog', async (req, res) => {
    try {
        const games = await findAll();
        res.render('catalog', { user: req.user, games });
    } catch (error) {
        res.render('default', { user: req.user });
    }
});


resourceController.get('/:id/details', async (req, res) => {
    try {
        const game = await findResourceById(req.params.id);
        const isOwner = req.user?._id == game.creatorId;

        res.render('details', { user: req.user, game });
    } catch (error) {
        res.render('default', { user: req.user });
    }
});


resourceController.get('/:id/delete', isUser, async (req, res) => {
    const resource = await findResourceById(req.params.id);

    if (req.user._id != resource.creatorId) {
        return res.redirect('/');
    }

    try {

    } catch (error) {
        res.render('default', { user: req.user });
    }
});

resourceController.post('/:id/delete', isUser, async (req, res) => {
    const resource = await findResourceById(req.params.id);

    if (req.user._id != resource.creatorId) {
        return res.redirect('/');
    }

    try {

    } catch (error) {
        res.render('delete', { user: req.user, body: req.body, error: errorParser(error) });
    }
});


resourceController.get('/:id/edit', isUser, async (req, res) => {
    const resource = await findResourceById(req.params.id);

    if (req.user._id != resource.creatorId) {
        return res.redirect('/');
    }

    try {

        res.render('edit', { user: req.user, resource });
    } catch (error) {
        res.render('default', { user: req.user });
    }
});

resourceController.post('/:id/edit', isUser, async (req, res) => {
    const resource = await findResourceById(req.params.id);

    if (req.user._id != resource.creatorId) {
        return res.redirect('/');
    }

    try {


        res.redirect('/');
    } catch (error) {
        res.render('edit', { user: req.user, body: req.body, error: errorParser(error) });
    }
});

module.exports = resourceController;