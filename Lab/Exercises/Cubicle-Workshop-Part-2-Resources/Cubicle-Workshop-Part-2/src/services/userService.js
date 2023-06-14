const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'mySecretKey';



async function register(username, password) {
    try {
        const isTaken = await User.findOne({ username });
        if (isTaken) {
            throw 'Username already taken.';
        }
        const pass = await bcrypt.hash(password, 10);
        await User.create({ username, password: pass });

    } catch (error) {
        throw error;
    }
}

async function login(username, password) {
    const user = await User.findOne({ username }).lean();

    try {
        const isAuthenticated = await bcrypt.compare(password, user.password);

        if (isAuthenticated) {
            const payload = { username: user.username, id: user._id, cubes: user.cubes };
            const token = jwt.sign(payload, secretKey);
            return token;
        }

    } catch (error) {
        throw 'Wrong username or password.';
    }
}

async function attachToken(req, res, tokenData) {
    const token = jwt.verify(tokenData, secretKey);
    res.cookie('user', tokenData);
    req.user = token;
    return token;
}

async function logout(req, res) {
    res.clearCookie('user');
}

module.exports = {
    register,
    login,
    logout,
    attachToken,
    secretKey
}