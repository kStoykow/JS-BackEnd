const User = require('../models/User');
const { SECRET } = require('../config/constants');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const findUserById = async (id) => {
    return User.findById(id).lean();
}

const register = async (email, firstName, lastName, password) => {
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        throw 'User already exists.';
    }
    const hashPass = await bcrypt.hash(password, 10);
    return await User.create({ email, firstName, lastName, password: hashPass });
}

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw 'Username or password dont match.';
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const payload = { firstName: user.firstName, lastName: user.lastName, email: user.email, _id: user._id };
        const token = jwt.sign(payload, SECRET);
        return token;
    } else {
        throw 'Username or password dont match.';
    }
}

const verifyToken = (user) => {
    const payload = { firstName: user.firstName, lastName: user.lastName, email: user.email, _id: user._id };
    const token = jwt.sign(payload, SECRET);
    return token;
}
module.exports = {
    register,
    findUserById,
    login,
    verifyToken
} 