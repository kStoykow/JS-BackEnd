const { Schema, model } = require('mongoose');

const resourceSchema = new Schema({
    title: { type: String, required: [true, 'Title is required.'], minLength: 2 },
    author: { type: String, required: [true, 'Author is required.'], minLength: 5 },
    imageUrl: { type: String, required: true, match: [/^https?:\/\//, 'imageUrl should start with http or https.'] },
    review: { type: String, required: [true, 'Review is required.'], minLength: 10 },
    genre: { type: String, required: [true, 'Genre is required.'], minLength: 3 },
    stars: { type: Number, required: [true, 'Stars is required.'], min: 1, max: 5 },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    wishList: { type: [Schema.Types.ObjectId], ref: 'User' }
});

const Resource = model('Resource', resourceSchema);

module.exports = Resource;