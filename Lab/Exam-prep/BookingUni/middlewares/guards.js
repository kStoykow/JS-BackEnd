function isUser(req, res, next) {
    if (req.user != undefined) {
        next();
    } else {
        return res.redirect('/user/login');
    }
}


module.exports = {
    isUser
}