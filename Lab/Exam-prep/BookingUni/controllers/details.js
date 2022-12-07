const { getById, isGuestBooked } = require('../services/hotel');
const { parseError } = require('../util/errorParser');

const details = require('express').Router();

details.get('/:id', async (req, res) => {
    const hotel = await getById(req.params.id);
    try {
        const owner = hotel.creatorId == req.user._id;
        const isBooked = await isGuestBooked(req.params.id, req.user._id);
        res.render('details', { title: 'Details', hotel, owner, isBooked });

    } catch (error) {
        const errors = parseError(error);
        res.render('details', { title: 'Details', hotel, error: errors });
    }
});

module.exports = details;