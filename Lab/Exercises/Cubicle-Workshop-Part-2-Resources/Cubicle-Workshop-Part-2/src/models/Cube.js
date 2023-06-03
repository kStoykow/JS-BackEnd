const mongoose = require('mongoose');

const CubeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    difficultyLevel: { type: Number, required: true, min: 1, max: 6 }
});

const Cube = mongoose.model('Cube', CubeSchema);

module.exports = Cube;