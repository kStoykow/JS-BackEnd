const details = require("../controllers/details");
const home = require("../controllers/home");
const user = require("../controllers/user");
const { isUser } = require("../middlewares/guards");

module.exports = (app) => {
    // TODO add guards and auth where its needed;

    app.use('/', home);
    app.use('/user', user);
    app.use('/details', isUser, details);
}