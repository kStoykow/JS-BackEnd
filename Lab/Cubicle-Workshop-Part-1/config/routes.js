// TODO: Require Controllers...
// const router = require('express').Router();

const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const { createGetController, createPostController } = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const defaultController = require('../controllers/defaultController');

module.exports = (app) => {
    // TODO...
    app.get('/', homeController);
    app.get('/about', aboutController);
    app.get('/create', createGetController);
    app.post('/create', createPostController);
    app.get('/details/:id', detailsController);
    app.all('*', defaultController);
};