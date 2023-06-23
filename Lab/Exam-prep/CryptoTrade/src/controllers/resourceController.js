const resourceController = require('express').Router();
const errorParser = require('../util/errorParser');

const isUser = require('../middlewares/isUser');
const { findAll } = require('../services/resourceService');
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
    // const coins = await findAll();
    const coins = [{ name: 'asd', price: 24, description: 'SecurityPolicyViolationEvent', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHZAq08u4YaR0Jsu2CgeptdxC74y-9QEeFYEAb6YHP&s', paymentMethod: 'credit-card', _id: '52' }];
    res.render('catalog', { user: req.user, coins });
});


resourceController.get('/search', async (req, res) => {
    res.render('search', { user: req.user });
});


resourceController.get('/:id/details', async (req, res) => {
    try {
        res.render('details', { user: req.user })
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