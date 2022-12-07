const Hotel = require('../models/Hotel');
const User = require('../models/User');

async function createHotel(hotelData) {
    const hotel = await Hotel.create(hotelData);
    const user = await User.findById(hotel.creatorId);
    user.hotels.push(hotel);
    await user.save();
}

async function getAll() {
    return Hotel.find({}).sort({ freeRooms: -1 }).lean();
}

async function getById(hotelId) {
    return Hotel.findById(hotelId).lean();
}

async function deleteById(hotelId) {
    const hotel = await Hotel.findById(hotelId);
    hotel.guests.map(guestId => removeBookedGuests(guestId, hotel));

    const owner = await User.findById(hotel.creatorId);
    owner.hotels.splice(owner.hotels.indexOf(hotel._id), 1);
    await owner.save();

    await Hotel.deleteOne({ _id: hotelId });
}

async function editHotel(data, hotelId) {
    const hotel = await Hotel.findById(hotelId);
    hotel.name = data.name;
    hotel.city = data.city;
    hotel.freeRooms = data.freeRooms;
    hotel.imageUrl = data.imageUrl;

    await hotel.save();
    return hotel;
}

async function isGuestBooked(hotelId, userId) {
    const hotel = await Hotel.findById(hotelId);
    return hotel.guests.includes(userId);
}

async function bookRoom(hotelId, userId) {
    const hotel = await Hotel.findById(hotelId);
    const user = await User.findById(userId);

    if (hotel.guests.includes(user._id) == false) {
        hotel.guests.push(user);
        hotel.freeRooms -= 1;
        console.log(hotel);
        await hotel.save();
        user.booked.push(hotel.name);
        await user.save();
    }
}

async function removeBookedGuests(guestId, hotel) {
    const guest = await User.findById(guestId);
    guest.booked.splice(guest.booked.indexOf(hotel.name), 1);
    await guest.save();
}
module.exports = {
    createHotel,
    getAll,
    getById,
    deleteById,
    isGuestBooked,
    bookRoom,
    editHotel
}