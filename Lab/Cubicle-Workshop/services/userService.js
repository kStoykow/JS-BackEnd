const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'my-secret-token';

async function createUser(username, password) {
    return User.create({ username, password });
}

async function isUsernameTaken(username) {
    const regex = new RegExp(`^${username}$`, 'i');
    const match = await User.findOne({ username: { $regex: regex } }).lean();
    return match == null ? false : true;
}

async function login(username, password) {
    const regex = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({ username: { $regex: regex } });

    if (user == null || await bcrypt.compare(password, user.password) != true) {
        throw new Error('Username or password doesn\'t match');
    }

    const payload = { username, id: user._id };
    return jwt.sign(payload, secretKey);
}

module.exports = {
    createUser,
    login,
    isUsernameTaken
}