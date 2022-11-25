function auth(req, res, next) {
    if (req.user == undefined) {
        return res.render('404', { title: 'Unauthorized', user: req.user, code: 401, message: 'You don\'t have access to this page.' })
    }
    next();
}

function permission(req, res, next) {
    if (req.user.cubes.includes(id)) {
        //TODO: check if user is creator and give permission;
    }

    next();
}
module.exports = auth;