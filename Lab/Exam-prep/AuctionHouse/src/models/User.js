const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: [true, 'email is required.'], match: [/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/, 'Invalid email.'] },
    firstName: { type: String, required: [true, 'First name is required.'], minLength: 1 },
    lastName: { type: String, required: [true, 'Last name is required.'], minLength: 1 },
    password: { type: String, required: [true, 'Password is required.'] },
});

const User = model('User', userSchema);

module.exports = User;