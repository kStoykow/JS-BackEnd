const home = require('express').Router();

home.get('/', (req, res) => {
    console.log(req.user);
    res.render('home', { title: 'BookingUni' });
});

module.exports = home;