const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'mySecretKey';



async function register(username, password) {
    const pass = await bcrypt.hash(password, 10);
    await User.create({ username, password: pass });
}

async function login(username, password) {
    const user = await User.findOne({ username }).lean();

    try {
        const isAuthenticated = await bcrypt.compare(password, user.password);

        if (isAuthenticated) {
            const payload = { username: user.username, id: user._id };
            const token = jwt.sign(payload, secretKey);
            return token;
        }

        throw 'Wrong username or password.';

    } catch (error) {
        throw 'Wrong username or password.';
    }
}

async function verifyToken(req, res, tokenData) {
    try {
        const token = jwt.verify(tokenData, secretKey);
        res.cookie('user', tokenData);
        req.user = token;
    } catch (error) {
        logout(req, res);
    }
}

async function logout(req, res) {
    res.clearCookie('user');
}

module.exports = {
    register,
    login,
    logout,
    verifyToken,
    secretKey
}