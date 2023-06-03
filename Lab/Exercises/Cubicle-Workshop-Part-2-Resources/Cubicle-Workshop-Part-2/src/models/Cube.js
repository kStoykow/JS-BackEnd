const mongoose = require('mongoose');

const CubeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number
});

const Cube = mongoose.model('Cube', CubeSchema);

module.exports = Cube;