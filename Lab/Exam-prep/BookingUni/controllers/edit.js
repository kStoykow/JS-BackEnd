const edit = require('express').Router();

edit.get('/', (req, res) => {
    res.render('edit', { title: 'Edit hotel' });
});

module.exports = edit;