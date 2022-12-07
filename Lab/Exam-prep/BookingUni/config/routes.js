const details = require("../controllers/details");
const home = require("../controllers/home");
const user = require("../controllers/user");
const create = require("../controllers/create");
const profile = require("../controllers/profile");
const edit = require("../controllers/edit");

const { isUser } = require("../middlewares/guards");
module.exports = (app) => {
    // TODO add guards and auth where its needed;

    app.use('/', home);
    app.use('/user', user);
    app.use('/details', details);
    app.use('/create', create);
    app.use('/edit', edit);
    app.use('/profile', profile);
    
    app.get('/book', (req, res) => {
        console.log(1);
        res.redirect('/');
    });
    app.get('/delete', (req, res) => {
        console.log(2);
        res.redirect('/');
    });
}