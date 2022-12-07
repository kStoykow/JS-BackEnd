const { getAll } = require('../services/hotel');

const home = require('express').Router();

home.get('/', async (req, res) => {
    try {
        const hotels = await getAll();
        res.render('home', { title: 'BookingUni', hotels });

    } catch (error) {
        const errors = parseError(error);
        res.render('home', { title: 'BookingUni', error: errors });
    }

});

module.exports = home;