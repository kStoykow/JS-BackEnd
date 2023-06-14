const mongoose = require('mongoose');

const CubeSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required.'] },
    description: { type: String, required: true, maxLength: [50, 'Description maximum length is 50.'] },
    imageUrl: {
        type: String, required: true, match: [/^https?:\/\//, 'imageUrl should start with http or https.']
    },
    difficulty: { type: Number, required: true, min: 1, max: 6 },
    accessories: [{ type: mongoose.Types.ObjectId, ref: 'Accessory' }],
    creatorId: { type: String, required: true }
});

const Cube = mongoose.model('Cube', CubeSchema);

module.exports = Cube;