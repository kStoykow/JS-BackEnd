const User = require('../models/User');
const bcrypt = require('bcrypt');

async function register(username, password) {
    const pass = await bcrypt.hash(password, 10);
    await User.create({ username, password: pass });
}

async function login() {

}

async function logout() {

}

module.exports = {
    register,
    login,
    logout
}