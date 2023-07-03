const User = require('../models/User');
const { SECRET } = require('../config/constants');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const findUserById = async (id) => {
    return User.findById(id);
}

const register = async (email, password, description) => {
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        throw 'User already exists.';
    }
    const hashPass = await bcrypt.hash(password, 10);
    return await User.create({ email, password: hashPass, description });
}

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw 'Username or password dont match.';
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const payload = { email: user.email, description: user.description, _id: user._id };
        const token = jwt.sign(payload, SECRET);
        return token;
    } else {
        throw 'Username or password dont match.';
    }
}

const verifyToken = (user) => {
    const payload = { email: user.email, description: user.description, _id: user._id };

    const token = jwt.sign(payload, SECRET);
    return token;
}
module.exports = {
    register,
    findUserById,
    login,
    verifyToken
} 