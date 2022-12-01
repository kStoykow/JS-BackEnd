// TODO: Require Controllers...

const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const cubeController = require('../controllers/cubeController');
const detailsController = require('../controllers/detailsController');
const defaultController = require('../controllers/defaultController');
const createAccessoryController = require('../controllers/createAccessoryController');
const attachAccessoryController = require('../controllers/attachAccessoryController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const editController = require('../controllers/editController');
const deleteController = require('../controllers/deleteController');
const logoutController = require('../controllers/logoutController');
const auth = require('../middlewares/auth');


module.exports = (app) => {
    // TODO...
    app.use('/', homeController);
    app.use('/login', loginController);
    app.use('/logout', logoutController);
    app.use('/register', registerController);
    app.use('/edit', auth, editController);
    app.use('/delete', auth, deleteController);
    app.use('/about', aboutController);
    app.use('/create/cube', auth, cubeController);
    app.use('/create/accessory', auth, createAccessoryController);
    app.use('/attach/accessory', auth, attachAccessoryController);
    app.use('/details', detailsController);
    app.use('*', defaultController);
};