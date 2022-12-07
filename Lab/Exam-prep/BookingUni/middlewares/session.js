const { verifyToken } = require("../services/user");

module.exports = () => (req, res, next) => {
    const token = req.cookies.token; // TODO check if cookie name is right; 
    if (token) {
        try {
            const userData = verifyToken(token);
            req.user = userData;
            res.locals.user = userData;
        } catch (error) {
            res.clearCookie('token'); // TODO check if cookie name is right; 
            return res.redirect('/user/login');
        }
    }

    next();
}