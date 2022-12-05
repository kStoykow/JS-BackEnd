const details = require('express').Router();

details.get('/:id', (req, res) => {
    res.render('details');
});

module.exports = details;