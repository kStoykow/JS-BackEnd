const { createHotel } = require('../services/hotel');
const { parseError } = require('../util/errorParser');

const create = require('express').Router();

create.get('/', (req, res) => {
    res.render('create');
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

        await createHotel({ name, city, freeRooms: Number(freeRooms), imageUrl });
        res.redirect('/');
    } catch (error) {
        const errors = parseError(error);
        res.render('create', { title: 'Create Hotel', body: req.body, error: errors });
    }
});

module.exports = create;