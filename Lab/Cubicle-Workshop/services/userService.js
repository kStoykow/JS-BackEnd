const User = require('../models/User');

async function createUser(username, password) {
    return await User.create({ username, password });
}

module.exports = {
    createUser
}