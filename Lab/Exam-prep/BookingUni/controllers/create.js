const { createHotel } = require('../services/hotel');
const { parseError } = require('../util/errorParser');

const create = require('express').Router();

create.get('/', (req, res) => {
    res.render('create', { title: 'Create Hotel' });
});

create.post('/', async (req, res) => {
    try {
        const name = req.body.hotel;
        const city = req.body.city;
        const freeRooms = req.body['free-rooms'];
        const imageUrl = req.body.imgUrl;

        if (name == '' || city == '' || freeRooms == '' || imageUrl == '') {
            throw new Error('All fields are required.');
        }

        await createHotel({ name, city, freeRooms: Number(freeRooms), imageUrl, creatorId: req.user });
        res.redirect('/');

    } catch (error) {
        const errors = parseError(error);
        const body = { name: req.body.hotel, city: req.body.city, freeRooms: req.body['free-rooms'], imageUrl: req.body.imgUrl }
        res.render('create', { title: 'Create Hotel', body, error: errors });
    }
});

module.exports = create;