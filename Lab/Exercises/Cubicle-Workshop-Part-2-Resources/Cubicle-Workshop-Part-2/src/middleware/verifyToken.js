const jwt = require('jsonwebtoken');
const { logout, secretKey } = require('../services/userService');

const verifyToken = async function (req, res, next) {
    try {
        const token = jwt.verify(req.cookies.user, secretKey);
        if (token) {
            res.cookie('user', req.cookies.user);
            req.user = token;
        }

    } catch (error) {
        res.clearCookie('user');
    }
    
    next();
}

module.exports = {
    secretKey,
    verifyToken
};