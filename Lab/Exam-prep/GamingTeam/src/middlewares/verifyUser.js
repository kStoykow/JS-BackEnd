const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/constants');

module.exports = (req, res, next) => {
    const token = req.cookies['user'];
    if (token) {
        try {
            const user = jwt.verify(token, SECRET);
            req.user = user;

        } catch (error) {
            res.clearCookie('user');
        }
    }

    return next();
}