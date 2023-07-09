const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: [true, 'email is required.'], match: /^[a-zA-Z]+@[a-zA-Z]+.[a-zA-Z]+$/ },
    password: { type: String, required: [true, 'Password is required.'] },
    description: { type: String, required: true, maxLength: [40, 'Description too long.'] },
    ads: { type: [Schema.Types.ObjectId], ref: 'Resources' }
});

const User = model('User', userSchema);

module.exports = User;