const { Schema, model } = require('mongoose');

const resourceSchema = new Schema({
    title: { type: String, required: [true, 'Title is required.'], minLength: 4 },
    description: { type: String, maxLength: [200, 'Description maximum length is 200.'] },
    category: { type: String, required: [true, 'Category is required'], enum: ['Vehicles', 'Real Estate', 'Electronics', 'Furniture', 'Other'] },
    imageUrl: { type: String, required: true, match: [/^https?:\/\//, 'imageUrl should start with http or https.'] },
    price: { type: Number, required: [true, 'Price is required.'], min: 0 },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    bidders: { type: [Schema.Types.ObjectId], ref: 'User' },
});

const Resource = model('Resource', resourceSchema);

module.exports = Resource;