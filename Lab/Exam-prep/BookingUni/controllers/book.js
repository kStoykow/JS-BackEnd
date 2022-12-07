const { getById, bookRoom } = require('../services/hotel');
const { parseError } = require('../util/errorParser');

const book = require('express').Router();

book.get('/:id', async (req, res) => {
    const hotel = await getById(req.params.id);

    if (req.user._id != hotel.creatorId) {
        try {
            await bookRoom(req.params.id, req.user._id);

            res.redirect('/details/' + req.params.id);
        } catch (error) {
            const errors = parseError(error);
            res.render('details', { title: 'details', hotel, error: errors })
        }

    } else {
        res.redirect('/details/' + req.params.id);
    }
});

module.exports = book;