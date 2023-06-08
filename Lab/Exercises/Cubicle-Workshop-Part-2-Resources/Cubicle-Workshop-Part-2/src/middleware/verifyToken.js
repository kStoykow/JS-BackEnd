const jwt = require('jsonwebtoken');
const { logout, secretKey } = require('../services/userService');

const verifyToken = function (req, res, next) {
    try {
        const token = jwt.verify(req.cookies.user, secretKey);

        res.cookie('user', req.cookies.user);
        req.user = token;
        next();

    } catch (error) {
        logout(req, res);
        next();
    }
}

module.exports = {
    secretKey,
    verifyToken
};