const bcrypt = require('bcrypt');

const User = require('../models/User');

async function login(username, password) {
    const userMatch = await User.findOne({ username: { $regex: new RegExp(username), $options: 'i' } });

    if (!userMatch || await bcrypt.compare(password, userMatch.password)) {
        throw new Error('Username or password don\'t match.');
    }

    return userMatch;
}

async function register(username, password) {
    const isTaken = await User.findOne({ username: { $regex: new RegExp(username), $options: 'i' } });
    if (isTaken) {
        throw new Error('Username is already taken.');
    }

    const hashedPass = await bcrypt.hash(password, 10);
    return User.create({ username: username.toLocaleLowerCase(), password: hashedPass });
}


module.exports = {
    login,
    register,
}