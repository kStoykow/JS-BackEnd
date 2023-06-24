const resourceController = require('express').Router();
const errorParser = require('../util/errorParser');

const isUser = require('../middlewares/isUser');
const { createResource, findAll, findResourceById, editResource, deleteResource, buyCrypto } = require('../services/resourceService');
//TODO:CHECK GUARDS
//TODO:CHECK GUARDS
//TODO: check if populating fields on wrong validation
//TODO: check if populating fields on wrong validation

resourceController.get('/create', isUser, async (req, res) => res.render('create', { user: req.user }));

resourceController.post('/create', isUser, async (req, res) => {
    try {
        const { name, image, price, description, paymentMethod } = req.body;
        await createResource({ name, image, price, description, paymentMethod, creatorId: req.user._id });
        res.redirect('/crypto/catalog');
    } catch (error) {
        res.render('create', { user: req.user, error: errorParser(error) });
    }
});


resourceController.get('/catalog', async (req, res) => {
    try {
        const coins = await findAll();
        res.render('catalog', { user: req.user, coins });
    } catch (error) {
        res.render('default', { user: req.user });
    }
});


resourceController.get('/search', async (req, res) => {
    res.render('search', { user: req.user });
});


resourceController.get('/:id/details', async (req, res) => {
    try {
        const coin = await findResourceById(req.params.id);
        const isOwner = req.user?._id == coin.creatorId;
        const canBuy = !coin.buyers.find(e => e == req.user?._id);

        res.render('details', { user: req.user, coin, isOwner, canBuy });
    } catch (error) {
        res.render('default', { user: req.user });

    }
});


resourceController.get('/:id/buy', isUser, async (req, res) => {
    const coin = await findResourceById(req.params.id);

    if (req.user._id == coin.creatorId) {
        return res.redirect('/');
    }

    await buyCrypto(req.user._id, req.params.id);
    res.redirect(`/crypto/${req.params.id}/details`);
});

resourceController.get('/:id/delete', isUser, async (req, res) => {
    try {
        await deleteResource(req.params.id);
        res.redirect('/crypto/catalog');
    } catch (error) {
        res.render('default', { user: req.user });
    }
});


resourceController.get('/:id/edit', isUser, async (req, res) => {
    const coin = await findResourceById(req.params.id);
    const optionsMap = [
        { value: 'crypto-wallet', text: 'Crypto Wallet' },
        { value: 'credit-card', text: 'Credit Card' },
        { value: 'debit-card', text: 'Debit Card' },
        { value: 'paypal', text: 'PayPal' },
    ]

    const options = optionsMap.map(e => coin.paymentMethod == e.value ? { ...e, selected: true } : e);
    console.log(options);
    if (req.user._id != coin.creatorId) {
        return res.redirect('/');
    }

    try {
        res.render('edit',
            { user: req.user, coin, options });
    } catch (error) {

    }
});

resourceController.post('/:id/edit', isUser, async (req, res) => {
    const coin = await findResourceById(req.params.id);

    if (req.user._id != coin.creatorId) {
        return res.redirect('/');
    }

    try {

    } catch (error) {
        res.render('edit', { user: req.user, body: req.body, error: errorParser(error) });
    }
});

module.exports = resourceController;