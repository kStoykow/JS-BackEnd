// TODO: Require Controllers...
const homeController = require('../controllers/home');
const aboutController = require('../controllers/about');
const createController = require('../controllers/create');
const accessoryController = require('../controllers/accessory');
const detailsController = require('../controllers/details');
const defaultController = require('../controllers/404');
const loginController = require('../controllers/login');
const registerController = require('../controllers/register');
const deleteController = require('../controllers/delete');
const editController = require('../controllers/edit');
const logoutController = require('../controllers/logout');



module.exports = (app) => {
    //Set routes
    app.use('/', homeController);
    app.use('/about', aboutController);
    app.use('/create', createController);
    app.use('/accessory', accessoryController);
    app.use('/details', detailsController);
    app.use('/delete', deleteController);
    app.use('/edit', editController);
    app.use('/register', registerController);
    app.use('/login', loginController);
    app.use('/logout', logoutController);

    app.use('*', defaultController);
}