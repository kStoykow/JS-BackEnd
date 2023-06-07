// TODO: Require Controllers...
const homeController = require('../controllers/home');
const aboutController = require('../controllers/about');
const createController = require('../controllers/create');
const accessoryController = require('../controllers/accessory');
const detailsController = require('../controllers/details');
const defaultController = require('../controllers/404');



module.exports = (app) => {
    //Set routes
    app.use('/', homeController);
    app.use('/about', aboutController);
    app.use('/create', createController);
    app.use('/accessory', accessoryController);
    app.use('/details', detailsController);

    app.use('*', defaultController);
}