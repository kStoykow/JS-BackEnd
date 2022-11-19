const { Schema, model, Types } = require('mongoose');

function httpValidator(v) {
    return v.startsWith('http') || v.startsWith('https');
}


const AccessoarySchema = new Schema({
    name: { type: String, required: true },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: httpValidator,
            message: 'Wrong protocol.'
        }
    },
    description: { type: String, required: true, minLength: 1 },
    cubes: { type: [Types.ObjectId], default: [], ref: 'Cube' }
});

const Accessory = model('Accessory', AccessoarySchema);

module.exports = Accessory;