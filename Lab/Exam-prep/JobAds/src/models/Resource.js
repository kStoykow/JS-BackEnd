const { Schema, model } = require('mongoose');

const resourceSchema = new Schema({
    headline: { type: String, required: [true, 'Headline is required.'], minLength: [4, 'Headline min length is 4.'] },
    location: { type: String, required: [true, 'Location is required.'], minLength: [8, 'Location min length is 8.'] },
    name: { type: String, required: [true, 'Company name is required.'], minLength: [3, 'Company name min length is 3.'] },
    description: { type: String, required: [true, 'Company description is required.'], maxLength: [40, 'Description maximum length is 40.']  },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    applies: { type: [Schema.Types.ObjectId], ref: 'User' },
});

const Resource = model('Resource', resourceSchema);

module.exports = Resource;