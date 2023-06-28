const resourceController = require('express').Router();
const errorParser = require('../util/errorParser');

const isUser = require('../middlewares/isUser');
const { createResource, findAll, findResourceById, editResource, deleteResource, buy } = require('../services/resourceService');
//TODO:CHECK GUARDS
//TODO:CHECK GUARDS
//TODO: check if populating fields on wrong validation
//TODO: check if populating fields on wrong validation

resourceController.get('/create', isUser, async (req, res) => res.render('create', { user: req.user }));

resourceController.post('/create', isUser, async (req, res) => {
    try {
        const { platform, name, imageUrl, price, genre, description } = req.body;

        await createResource({ platform, name, imageUrl, price, genre, description, creatorId: req.user._id });
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
        const isBought = game.buyers.some(userId => req.user?._id == userId);

        res.render('details', { user: req.user, isOwner, isBought, game });
    } catch (error) {
        res.render('default', { user: req.user });
    }
});


resourceController.get('/:id/delete', isUser, async (req, res) => {
    const game = await findResourceById(req.params.id);

    if (req.user._id != game.creatorId) {
        return res.redirect('/');
    }

    try {
        await deleteResource(req.params.id);
        res.redirect('/games/catalog');
    } catch (error) {
        res.render('default', { user: req.user });
    }
});


resourceController.get('/:id/buy', isUser, async (req, res) => {
    const game = await findResourceById(req.params.id);

    if (req.user._id == game.creatorId) {
        return res.redirect('/');
    }
    if (game.buyers.some(e => e == req.user._id)) {
        return res.redirect('/games/catalog');
    }

    await buy(req.user._id, req.params.id);
    res.redirect(`/games/${req.params.id}/details`);
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