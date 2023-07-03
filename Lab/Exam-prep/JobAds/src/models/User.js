const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: [true, 'email is required.'] },
    password: { type: String, required: [true, 'Password is required.'] },
    description: { type: String, required: true },
    ads: { type: [Schema.Types.ObjectId], ref: 'Resources' }
});

const User = model('User', userSchema);

module.exports = User;