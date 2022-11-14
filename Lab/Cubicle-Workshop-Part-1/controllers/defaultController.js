function defaultController(req, res) {
    res.render('404', { title: 'Page Not Found' });
}

module.exports = defaultController;