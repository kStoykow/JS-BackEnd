// TODO: Require Controllers...

const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const cubeController = require('../controllers/cubeController');
const detailsController = require('../controllers/detailsController');
const defaultController = require('../controllers/defaultController');
const createAccessoryController = require('../controllers/createAccessoryController');
const attachAccessoryController = require('../controllers/attachAccessoryController');

module.exports = (app) => {
    // TODO...
    app.use('/', homeController);
    app.use('/about', aboutController);
    app.use('/create/cube', cubeController);
    app.use('/create/accessory', createAccessoryController);
    app.use('/attach/accessory', attachAccessoryController);
    app.use('/details', detailsController);
    app.use('*', defaultController);
};