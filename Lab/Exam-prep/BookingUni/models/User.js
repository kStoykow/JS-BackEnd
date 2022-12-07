const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, minLength: [5, 'Password must be atleast 5 chars.'] }
});

//TODO add needed properties and validations to model

const User = model('User', userSchema);

module.exports = User;