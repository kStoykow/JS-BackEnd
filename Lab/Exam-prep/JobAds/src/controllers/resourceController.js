const resourceController = require('express').Router();
const errorParser = require('../util/errorParser');

const isUser = require('../middlewares/isUser');
const { createResource, findAll, findResourceById, editResource, deleteResource, apply, getApplies } = require('../services/resourceService');
//TODO:CHECK GUARDS
//TODO:CHECK GUARDS
//TODO: check if populating fields on wrong validation
//TODO: check if populating fields on wrong validation

resourceController.get('/create', isUser, async (req, res) => res.render('create', { user: req.user }));

resourceController.post('/create', isUser, async (req, res) => {
    try {
        const { headline, location, name, description } = req.body;
        await createResource({ headline, location, name, description, creatorId: req.user._id });

        res.redirect('/ads/catalog');
    } catch (error) {
        console.log(error);
        res.render('create', { user: req.user, error: errorParser(error) });
    }
});


resourceController.get('/:id/apply', isUser, async (req, res) => {
    const ad = await findResourceById(req.params.id);
    if (ad.applies.some(id => id == req.user._id)) {
        return res.redirect(`/ads/${req.params.id}/details`);
    }

    try {
        await apply(req.user._id, req.params.id);

        res.redirect(`/ads/${req.params.id}/details`);
    } catch (error) {
        console.log(error);
        res.render('default', { user: req.user, error: errorParser(error) });
    }
});



resourceController.get('/catalog', async (req, res) => {
    try {
        const ads = await findAll();
        res.render('catalog', { user: req.user, ads });
    } catch (error) {
        res.render('default', { user: req.user });
    }
});


resourceController.get('/:id/details', async (req, res) => {
    try {
        const ad = await findResourceById(req.params.id);
        const applies = await getApplies(req.params.id);
        console.log(applies);
        const isOwner = req.user?._id == ad.creatorId._id;
        const isApply = ad.applies.some(id => id == req.user?._id);
        
        res.render('details', { user: req.user, ad, isOwner, isApply, applies });
    } catch (error) {
        res.render('default', { user: req.user, error: errorParser(error) });
    }
});


resourceController.get('/:id/delete', isUser, async (req, res) => {
    const ad = await findResourceById(req.params.id);

    if (req.user._id != ad.creatorId._id) {
        return res.redirect('/');
    }

    await deleteResource(req.params.id);
    res.redirect('/ads/catalog');
});



resourceController.get('/:id/edit', isUser, async (req, res) => {
    const ad = await findResourceById(req.params.id);

    if (req.user._id != ad.creatorId._id) {
        return res.redirect('/');
    }

    try {

        res.render('edit', { user: req.user, ad });
    } catch (error) {
        res.render('edit', { user: req.user, error: errorParser(error) });
    }
});

resourceController.post('/:id/edit', isUser, async (req, res) => {
    const ad = await findResourceById(req.params.id);

    if (req.user._id != ad.creatorId._id) {
        return res.redirect('/');
    }

    try {
        await editResource(req.params.id, req.body);

        res.redirect(`/ads/${req.params.id}/details`);
    } catch (error) {
        res.render('edit', { user: req.user, body: req.body, error: errorParser(error) });
    }
});

module.exports = resourceController;