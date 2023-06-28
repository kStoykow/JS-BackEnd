module.exports = (req, res, next) => {
    const user = req.user;
    if (!user) {
        return next();
    }
    return res.redirect('/');
}