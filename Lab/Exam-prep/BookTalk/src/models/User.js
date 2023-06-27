const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: [true, 'Username is required.'], minLength: 4 },
    email: { type: String, required: [true, 'email is required.'], minLength: 10 },
    password: { type: String, required: [true, 'Password is required.'] },
});

const User = model('User', userSchema);

module.exports = User;