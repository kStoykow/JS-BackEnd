const resourceController = require('express').Router();
const errorParser = require('../util/errorParser');

const isUser = require('../middlewares/isUser');
//TODO:CHECK GUARDS
//TODO:CHECK GUARDS
//TODO: check if populating fields on wrong validation
//TODO: check if populating fields on wrong validation

resourceController.get('/create', isUser, async (req, res) => res.render('create', { user: req.user }));

resourceController.post('/create', isUser, async (req, res) => {
    try {

    } catch (error) {
        res.render('create', { user: req.user, body: req.body, error: errorParser(error) });
    }
});


resourceController.get('/catalog', async (req, res) => {
    res.render('catalog', { user: req.user });
});


resourceController.get('/search', async (req, res) => {
    res.render('search', { user: req.user });
});


resourceController.get('/:id/details', async (req, res) => {
    try {

    } catch (error) {

    }
});


resourceController.get('/:id/delete', isUser, async (req, res) => {
    try {

    } catch (error) {

    }
});
resourceController.post('/:id/delete', isUser, async (req, res) => {
    try {

    } catch (error) {
        res.render('delete', { user: req.user, body: req.body, error: errorParser(error) });
    }
});


resourceController.get('/:id/edit', isUser, async (req, res) => {
    try {

    } catch (error) {

    }
});

resourceController.post('/:id/edit', isUser, async (req, res) => {
    try {

    } catch (error) {
        res.render('edit', { user: req.user, body: req.body, error: errorParser(error) });
    }
});

module.exports = resourceController;