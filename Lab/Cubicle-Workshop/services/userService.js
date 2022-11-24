const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'my-secret-token';

async function createUser(username, password) {
    return User.create({ username, password });
}

async function getUser(user) {
    return User.find({}).where('username').equals(user.username).lean();
}

async function login(username, password) {
    const payload = { username, password: await bcrypt.hash(password, 10) };
    return jwt.sign(payload, secretKey);
}

module.exports = {
    createUser,
    getUser,
    login
}