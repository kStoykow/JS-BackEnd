const { Schema, model } = require('mongoose');

const resourceSchema = new Schema({
    headline: { type: String, required: [true, 'Headline is required.'] },
    location: { type: String, required: [true, 'Location is required.'] },
    name: { type: String, required: [true, 'Company name is required.'] },
    description: { type: String, required: [true, 'Company description is required.'], /*maxLength: [50, 'Description maximum length is 50.'] */ },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    applies: { type: [Schema.Types.ObjectId], ref: 'User' },
});

const Resource = model('Resource', resourceSchema);

module.exports = Resource;