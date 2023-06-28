const resourceController = require('express').Router();
const errorParser = require('../util/errorParser');

const isUser = require('../middlewares/isUser');
const { createResource, findAll, findResourceById, editResource, deleteResource, buy, searchGame } = require('../services/resourceService');

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

resourceController.get('/search', async (req, res) => {
    const { search, platform } = req.query;
    const optionsMap = [
        { value: "", label: '-------' },
        { value: "PC", label: 'PC' },
        { value: "Nintendo", label: 'Nintendo' },
        { value: "PS4", label: 'PS4' },
        { value: "PS5", label: 'PS5' },
        { value: "XBOX", label: 'XBOX' }];

    const options = optionsMap.map(e => e.value == platform ? { ...e, selected: true } : e);

    try {
        const games = await searchGame(search, platform);
        res.render('search', { user: req.user, games, options, search })

    } catch (error) {
        res.render('default', { user: req.user });
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
    const game = await findResourceById(req.params.id);

    const optionsMap = [
        { value: "", label: '-------' },
        { value: "PC", label: 'PC' },
        { value: "Nintendo", label: 'Nintendo' },
        { value: "PS4", label: 'PS4' },
        { value: "PS5", label: 'PS5' },
        { value: "XBOX", label: 'XBOX' }];

    const options = optionsMap.map(e => e.value == game.platform ? { ...e, selected: true } : e);

    if (req.user._id != game.creatorId) {
        return res.redirect('/');
    }


    try {

        res.render('edit', { user: req.user, game, options });
    } catch (error) {
        res.render('edit', { user: req.user, game, options, body: req.body, error: errorParser(error) });
    }
});

resourceController.post('/:id/edit', isUser, async (req, res) => {
    const game = await findResourceById(req.params.id);
    const optionsMap = [
        { value: "", label: '-------' },
        { value: "PC", label: 'PC' },
        { value: "Nintendo", label: 'Nintendo' },
        { value: "PS4", label: 'PS4' },
        { value: "PS5", label: 'PS5' },
        { value: "XBOX", label: 'XBOX' }];

    const options = optionsMap.map(e => e.value == game.platform ? { ...e, selected: true } : e);

    if (req.user._id != game.creatorId) {
        return res.redirect('/');
    }

    try {
        await editResource(game._id, req.body);

        res.redirect(`/games/${game._id}/details`);
    } catch (error) {
        res.render('edit', { user: req.user, game, options, error: errorParser(error) });
    }
});



module.exports = resourceController;