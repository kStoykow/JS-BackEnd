const { Schema, model } = require('mongoose');

const resourceSchema = new Schema({
    name: { type: String, required: [true, 'Name is required.'] },
    imageUrl: { type: String, required: true, match: [/^https?:\/\//, 'imageUrl should start with http or https.'] },
    price: { type: Number, required: [true, 'Price is required.'] },
    description: { type: String, required: [true, 'Description is required.'], /*maxLength: [50, 'Description maximum length is 50.'] */ },
    genre: { type: String, required: [true, 'Genre is required.'] },
    platform: { type: String, required: [true, 'Platform is required.'], enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'] },
    buyers: { type: [Schema.Types.ObjectId], ref: 'User' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Resource = model('Resource', resourceSchema);

module.exports = Resource;