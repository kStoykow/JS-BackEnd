const { Schema, model } = require('mongoose');

const resourceSchema = new Schema({
    name: { type: String, required: [true, 'Name is required.'] },
    imageUrl: { type: String, required: true, /* match: [/^https?:\/\//, 'imageUrl should start with http or https.']*/ },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' }
    // description: { type: String, required: true, /*maxLength: [50, 'Description maximum length is 50.'] */ },
});

const Resource = model('Resource', resourceSchema);

module.exports = Resource;