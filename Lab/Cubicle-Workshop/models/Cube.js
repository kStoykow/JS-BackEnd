const { Schema, model, Types } = require('mongoose');

function httpValidator(v) {
    return v.startsWith('http') || v.startsWith('https');
}

const CubeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, minLength: 1 },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: httpValidator,
            message: 'Wrong protocol.'
        }
    },
    difficulty: { type: Number, required: true, min: 1, max: 6 },
    creatorId: { type: String, required: true },
    accessories: { type: [Types.ObjectId], default: [], ref: 'Accessory' }
});

const Cube = model('Cube', CubeSchema);

module.exports = Cube;