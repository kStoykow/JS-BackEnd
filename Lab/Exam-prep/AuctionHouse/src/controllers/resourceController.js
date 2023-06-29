const resourceController = require('express').Router();
const errorParser = require('../util/errorParser');

const isUser = require('../middlewares/isUser');
const { createResource, findAll, findResourceById, editResource, deleteResource, bidding } = require('../services/resourceService');
const { findUserById } = require('../services/userService');
//TODO:CHECK GUARDS
//TODO:CHECK GUARDS
//TODO: check if populating fields on wrong validation
//TODO: check if populating fields on wrong validation

resourceController.get('/create', isUser, async (req, res) => res.render('create', { user: req.user }));

resourceController.post('/create', isUser, async (req, res) => {
    try {
        const { title, category, imageUrl, price, description } = req.body;
        await createResource({ title, category, imageUrl, price, description, creatorId: req.user._id });

        res.redirect('/auctions/catalog');
    } catch (error) {
        console.log(error);
        res.render('create', { user: req.user, body: req.body, error: errorParser(error) });
    }
});


resourceController.get('/catalog', async (req, res) => {
    try {
        const auctions = await findAll();
        res.render('catalog', { user: req.user, auctions });
    } catch (error) {
        res.render('default', { user: req.user });
    }
});


resourceController.post('/:id/bid', isUser, async (req, res) => {
    const auction = await findResourceById(req.params.id);
    const { bid } = req.body;

    if (req.user._id == auction.creatorId) {
        return res.redirect(`/auctions/${req.params.id}/details`);
    }

    if (req.user._id == auction.bidder) {
        return res.render('details', { user: req.user, auction, error: errorParser('You are the current bidder.') });
    }
    if (bid <= auction.price) {
        return res.render('details', { user: req.user, auction, error: errorParser('Bid must be bigger than price.') });
    }

    try {
        await bidding(req.user._id, auction._id, bid);
        res.redirect(`/auctions/${req.params.id}/details`);
    } catch (error) {
        res.render('default', { user: req.user });
    }
});


resourceController.get('/:id/details', async (req, res) => {
    try {
        const auction = await findResourceById(req.params.id);
        const isOwner = req.user?._id == auction.creatorId;
        const owner = await findUserById(auction.creatorId);
        const isBidder = req.user._id == auction.bidder;
        const highestBid = auction.bidder;
        if (isOwner) {
            return res.render('details-owner', { user: req.user, auction, owner })
        }

        res.render('details', { user: req.user, auction, owner, isBidder });
    } catch (error) {
        res.render('details', { user: req.user, error: errorParser(error) });
    }
});


resourceController.get('/:id/delete', isUser, async (req, res) => {
    const auction = await findResourceById(req.params.id);

    if (req.user._id != auction.creatorId) {
        return res.redirect('/');
    }

    try {
        await deleteResource(req.params.id);
        res.redirect('/auctions/catalog')
    } catch (error) {
        res.render('default', { user: req.user, error: errorParser(error) });
    }
});


resourceController.get('/:id/edit', isUser, async (req, res) => {
    const auction = await findResourceById(req.params.id);

    if (req.user._id != auction.creatorId) {
        return res.redirect('/');
    }

    try {

        res.render('edit', { user: req.user, auction });
    } catch (error) {
        res.render('default', { user: req.user, error: errorParser(error) });
    }
});

resourceController.post('/:id/edit', isUser, async (req, res) => {
    const auction = await findResourceById(req.params.id);

    if (req.user._id != auction.creatorId) {
        return res.redirect('/');
    }

    try {
        await editResource(req.params.id, req.body);
        res.redirect(`/auctions/${req.params.id}/details`);
    } catch (error) {
        res.render('edit', { user: req.user, auction, error: errorParser(error) });
    }
});

module.exports = resourceController;