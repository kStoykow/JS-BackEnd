const { ObjectID } = require('bson');
const { Schema, model, SchemaType } = require('mongoose');

function httpValidator(v) {
    return v.startsWith('http') || v.startsWith('https');
}

const cubeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxLength: 10 },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: httpValidator,
            message: 'Wrong protocol.'
        }
    },
    difficulty: { type: Number, required: true, min: 1, max: 6 },
    accessoaries: { SchemaType: ObjectID ,} // TO FINISH
    //TO FINISH
})

