const User = require('../models/User');
const { SECRET } = require('../config/constants');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const findUserById = async (id) => {
    return User.findById(id);
}

const register = async (username, password) => {
    const user = await User.findOne({ username });
    if (user) {
        throw 'User already exists.';
    }

    const hashPass = await bcrypt.hash(password, 10);
    return await User.create({ username, password: hashPass });
}

const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw 'Username or password dont match.';
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const payload = { username, _id: user._id };
        const token = jwt.sign(payload, SECRET);
        return token;
    } else {
        throw 'Username or password dont match.';
    }
}

//TODO: Delete if not needed
const verifyToken = (user) => {
    const payload = { username: user.username, _id: user._id };
    const token = jwt.sign(payload, SECRET);
    return token;
}
module.exports = {
    register,
    findUserById,
    login,
    verifyToken // here also
} 