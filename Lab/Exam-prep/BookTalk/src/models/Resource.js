const { Schema, model } = require('mongoose');

const resourceSchema = new Schema({
    title: { type: String, required: [true, 'Title is required.'] },
    author: { type: String, required: [true, 'Author is required.'] },
    imageUrl: { type: String, required: true, match: [/^https?:\/\//, 'imageUrl should start with http or https.'] },
    review: { type: String, required: [true, 'Review is required.'] },
    genre: { type: String, required: [true, 'Genre is required.'] },
    stars: { type: Number, required: [true, 'Stars is required.'], min: 1, max: 5 },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    wishList: { type: [Schema.Types.ObjectId], ref: 'User' }
});

const Resource = model('Resource', resourceSchema);

module.exports = Resource;