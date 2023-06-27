const resourceController = require('express').Router();
const errorParser = require('../util/errorParser');

const isUser = require('../middlewares/isUser');
const { createResource, findAll, findResourceById, editResource, deleteResource, wishRead } = require('../services/resourceService');

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


resourceController.get('/:id/wish', async (req, res) => {
    await wishRead(req.user._id, req.params.id);

    res.redirect(`/books/${req.params.id}/details`);
});


resourceController.get('/:id/details', async (req, res) => {
    try {
        const book = await findResourceById(req.params.id);
        const isOwner = req.user?._id == book.ownerId;
        const isWish = book.wishList.some(e => e == req.user?._id);
        res.render('details', { user: req.user, book, isOwner, isWish })
    } catch (error) {
        res.render('default', { user: req.user })
    }
});


resourceController.get('/:id/delete', isUser, async (req, res) => {
    const book = await findResourceById(req.params.id);

    if (req.user._id != book.ownerId) {
        return res.redirect('/');
    }

    await deleteResource(book._id);
    res.redirect('/books/catalog');

});


resourceController.get('/:id/edit', isUser, async (req, res) => {
    const book = await findResourceById(req.params.id);

    if (req.user._id != book.ownerId) {
        return res.redirect('/');
    }
    res.render('edit', { user: req.user, book })
});

resourceController.post('/:id/edit', isUser, async (req, res) => {
    const book = await findResourceById(req.params.id);

    if (req.user._id != book.ownerId) {
        return res.redirect('/');
    }

    try {
        const data = req.body;
        await editResource(req.params.id, data);
        res.redirect(`/books/${req.params.id}/details`);

    } catch (error) {
        res.render('edit', { user: req.user, book, error: errorParser(error) });
    }
});

module.exports = resourceController;