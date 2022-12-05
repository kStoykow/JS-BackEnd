const home = require('express').Router();

home.get('/', (req, res) => {
    console.log(req.user);
    res.render('home');
});

module.exports = home;