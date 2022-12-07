const { deleteById, getById } = require('../services/hotel');
const { parseError } = require('../util/errorParser');

const deleteHotel = require('express').Router();

deleteHotel.get('/:id', async (req, res) => {
    const hotel = await getById(req.params.id);
    
    if (req.user._id == hotel.creatorId) {
        try {
            await deleteById(req.params.id);
            res.redirect('/');
        } catch (error) {
            const errors = parseError(error);
            res.render('home', { title: 'Something went wrong', error: errors })
        }
    } else {
        res.redirect('/');
    }
});

module.exports = deleteHotel;