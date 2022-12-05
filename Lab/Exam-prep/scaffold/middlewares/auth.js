const jwt = require('jsonwebtoken');
const secretKey = 'qwe';

module.exports = () => (req, res, next) => {
    // const token = req.cookies.token; // TODO check if cookie name is right; 
    // if (token) {
    //     try {
    //         const userData = jwt.verify(token, secretKey);
    //         req.user = userData;
    //         next();

    //     } catch (error) {
    //         res.clearCookie('token'); // TODO check if cookie name is right; 
    //         return res.redirect('/user/login');
    //     }

    // } else {
    //     return res.redirect('/user/register'); // TODO redirect to right place.
    // }
}