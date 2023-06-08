const jwt = require('jsonwebtoken');
const { logout, secretKey } = require('../services/userService');

const verifyToken = async function (req, res, next) {
    try {
        const token = jwt.verify(req.cookies.user, secretKey);
        res.cookie('user', req.cookies.user);
        req.user = token;
        next();

    } catch (error) {
        console.log(1)
        logout(req, res);
        next();
    }
}

module.exports = {
    secretKey,
    verifyToken
};