const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required.'],
        minLength: [5, 'Username too short.'],
        match: [/^[a-zA-Z0-9]+$/, 'Username must be from latin letters and numbers only.']
    },

    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;