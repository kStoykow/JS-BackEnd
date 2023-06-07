const mongoose = require('mongoose');

const CubeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxLength: 50 },
    imageUrl: {
        type: String, required: true, match: /^https?:\/\//
    },
    difficulty: { type: Number, required: true, min: 1, max: 6 },
    accessories: [{ type: mongoose.Types.ObjectId, ref: 'Accessory' }],
    creatorId: { type: String, required: true }
});

const Cube = mongoose.model('Cube', CubeSchema);

module.exports = Cube;