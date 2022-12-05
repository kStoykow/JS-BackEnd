const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

//TODO add needed properties and validations to model

const User = model('User', userSchema);

module.exports = User;