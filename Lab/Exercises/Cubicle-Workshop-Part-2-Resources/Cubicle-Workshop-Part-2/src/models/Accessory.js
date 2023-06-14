const mongoose = require('mongoose');

const AccessorySchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    imageUrl: {
        type: String, required: true, match: [/^https?:\/\//, 'ImageUrl should start with http or https']
    },
    description: { type: String, required: true, maxLength: 50 },
});

const Accessory = mongoose.model('Accessory', AccessorySchema);

module.exports = Accessory;