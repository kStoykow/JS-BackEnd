const profile = require('express').Router();

profile.get('/', (req, res) => {
    res.render('profile', { title: 'BookingUni Profile' });
});

module.exports = profile;