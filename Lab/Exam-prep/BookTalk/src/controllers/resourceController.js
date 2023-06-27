const resourceController = require('express').Router();
const errorParser = require('../util/errorParser');

const isUser = require('../middlewares/isUser');
const { createResource, findAll, findResourceById } = require('../services/resourceService');
//TODO:CHECK GUARDS
//TODO:CHECK GUARDS
//TODO: check if populating fields on wrong validation
//TODO: check if populating fields on wrong validation

resourceController.get('/create', isUser, async (req, res) => res.render('create', { user: req.user }));

resourceController.post('/create', isUser, async (req, res) => {
    try {
        const { title, author, genre, stars, imageUrl, review } = req.body;
        await createResource({ title, author, genre, stars, imageUrl, review, ownerId: req.user._id });

        res.redirect('/books/catalog');
    } catch (error) {
        console.log(error);
        res.render('create', { user: req.user, body: req.body, error: errorParser(error) });
    }
});


resourceController.get('/catalog', async (req, res) => {
    try {
        const books = await findAll();
        res.render('catalog', { user: req.user, books });
    } catch (error) {
        res.render('default', { user: req.user });
    }
});


resourceController.get('/:id/details', async (req, res) => {
    try {
        const book = await findResourceById(req.params.id);
        const isOwner = req.user?._id == book.ownerId;

        res.render('details', { user: req.user, book, isOwner })
    } catch (error) {

    }
});


resourceController.get('/:id/delete', isUser, async (req, res) => {
    const resource = await findResourceById(req.params.id);

    if (req.user._id != resource.ownerId) {
        return res.redirect('/');
    }

    try {

    } catch (error) {

    }
});

resourceController.post('/:id/delete', isUser, async (req, res) => {
    const book = await findResourceById(req.params.id);

    if (req.user._id != book.ownerId) {
        return res.redirect('/');
    }

    try {

    } catch (error) {
        res.render('delete', { user: req.user, body: req.body, error: errorParser(error) });
    }
});


resourceController.get('/:id/edit', isUser, async (req, res) => {
    const book = await findResourceById(req.params.id);

    if (req.user._id != book.ownerId) {
        return res.redirect('/');
    }

    try {
        res.render('edit', { user: req.user, book })
    } catch (error) {

    }
});

resourceController.post('/:id/edit', isUser, async (req, res) => {
    const book = await findResourceById(req.params.id);

    if (req.user._id != book.ownerId) {
        return res.redirect('/');
    }

    try {


    } catch (error) {
        res.render('edit', { user: req.user, body: req.body, error: errorParser(error) });
    }
});

module.exports = resourceController;