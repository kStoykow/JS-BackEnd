const details = require("../controllers/details");
const home = require("../controllers/home");
const user = require("../controllers/user");
const create = require("../controllers/create");
const profile = require("../controllers/profile");
const edit = require("../controllers/edit");
const { isUser } = require("../middlewares/guards");
const deleteHotel = require("../controllers/delete");
const book = require("../controllers/book");

module.exports = (app) => {
    // TODO add guards and auth where its needed;

    app.use('/', home);
    app.use('/user', user);
    app.use('/details', isUser, details);
    app.use('/create', isUser, create);
    app.use('/edit', isUser, edit);
    app.use('/profile', isUser, profile);
    app.use('/book', isUser, book);
    app.use('/delete', isUser, deleteHotel);
}