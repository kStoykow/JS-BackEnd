const { getById } = require('../services/hotel');
const { parseError } = require('../util/errorParser');

const details = require('express').Router();

details.get('/:id', async (req, res) => {
    try {
        const hotel = await getById(req.params.id);
        res.render('details', { title: 'BookingUni', hotel });

    } catch (error) {
        const errors = parseError(error);
        res.render('details', { title: 'BookingUni', hotel, error: errors });
    }
});

module.exports = details;