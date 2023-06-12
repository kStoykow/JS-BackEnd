const isUser = async (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect('/404');
}

module.exports = isUser;