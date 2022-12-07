const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secretKey = 'qwe';


async function login(username, password) {
    const userMatch = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (userMatch == null || await bcrypt.compare(password, userMatch.password) == false) {
        throw new Error('Username or password don\'t match.');
    }

    const token = createSession(userMatch);
    return token;
}

async function register(email, username, password) {
    const isEmailTaken = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (isEmailTaken) {
        throw new Error('Email is already taken.');
    }
    const isUsernameTaken = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (isUsernameTaken) {
        throw new Error('Username is already taken.');
    }
    if (password.length < 5) {
        throw new Error('Password must be atleast 5 chars.');
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashedPass });

    const token = createSession(user);
    return token;
}

function createSession(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }

    return jwt.sign(payload, secretKey);
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);

    } catch (error) {
        res.clearCookie('token');
    }
}

module.exports = {
    login,
    register,
    verifyToken
}