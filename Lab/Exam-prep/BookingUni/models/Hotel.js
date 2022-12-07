const { Schema, model } = require('mongoose');

const hotelSchema = new Schema({
    name: { type: String, required: true, unique: true, minLength: [4, 'Name must be atleast 4 letters.'] },
    city: { type: String, required: true, minLength: [3, 'City must be atleast 3 letters.'] },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^https?.*/i.test(v),
            message: 'ImageUrl must start with http or https.'
        }
    },
    freeRooms: { type: Number, min: [1, 'Minimum 1 room'], max: [100, 'Maximum 100 rooms'] },
});
hotelSchema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});
//TODO add needed properties and validations to model

const Hotel = model('Hotel', hotelSchema);

module.exports = Hotel;