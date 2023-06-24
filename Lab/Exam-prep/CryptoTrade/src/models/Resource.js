const { Schema, model } = require('mongoose');

const resourceSchema = new Schema({
    name: { type: String, required: [true, 'Name is required.'], minLength: 2 },
    image: { type: String, required: true, match: [/^https?:\/\//, 'image url should start with http or https.'] },
    price: { type: Number, required: [true, 'Price is required.'], min: 0 },
    paymentMethod: { type: String, enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'] },
    description: { type: String, required: true, minLength: [50, 'Description maximum length is 50.'] },
    buyers: { type: [Schema.Types.ObjectId], ref: 'User' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Crypto = model('Resource', resourceSchema);

module.exports = Crypto;