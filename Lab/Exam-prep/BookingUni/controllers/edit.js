const { getById, editHotel } = require('../services/hotel');
const { parseError } = require('../util/errorParser');

const edit = require('express').Router();

edit.get('/:id', async (req, res) => {
    const hotel = await getById(req.params.id);
    if (req.user._id == hotel.creatorId) {
        res.render('edit', { title: 'Edit hotel', hotel });
    } else {
        res.redirect('/');
    }
});

edit.post('/:id', async (req, res) => {
    const hotelId = req.params.id;
    const hotel = await getById(hotelId);
    
    if (req.user._id == hotel.creatorId) {
        try {
            const hotelData = { name: req.body.hotel, city: req.body.city, imageUrl: req.body.imgUrl, freeRooms: Number(req.body['free-rooms']) };
            if (Object.values(hotelData).some(v => !v)) {
                throw new Error('All fields are required.');
            }

            await editHotel(hotelData, hotelId);
            res.redirect('/details/' + hotelId);
        } catch (error) {
            const errors = parseError(error);
            res.render('edit', { title: 'Edit hotel', hotel, error: errors });
        }
    } else {
        res.redirect('/');
    }
});
module.exports = edit;