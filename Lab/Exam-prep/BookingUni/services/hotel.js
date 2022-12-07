const Hotel = require('../models/Hotel');

async function createHotel(hotelData) {
    return Hotel.create(hotelData);
}

async function getAll() {
    return Hotel.find({}).lean();
}

async function getById(hotelId) {
    return Hotel.findById(hotelId).lean();
}

module.exports = {
    createHotel,
    getAll,
    getById
}