const { Schema, model } = require('mongoose');

const resourceSchema = new Schema({
    title: { type: String, required: [true, 'Title is required.'], minLength: 4 },
    description: { type: String, maxLength: [200, 'Description maximum length is 200.'] },
    category: { type: String, required: [true, 'Category is required'], enum: ['vehicles', 'estate', 'electronics', 'furniture', 'other'] },
    imageUrl: { type: String },
    price: { type: Number, required: [true, 'Price is required.'], min: 0 },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    bidder: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Resource = model('Resource', resourceSchema);

module.exports = Resource;