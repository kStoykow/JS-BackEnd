const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const resourceController = require('../controllers/resourceController');
const defaultController = require('../controllers/defaultController');

module.exports = (app) => {
    app.use('/', homeController)
    app.use('/user', authController);
    app.use('/ads', resourceController); 

    app.use('*', defaultController);

}