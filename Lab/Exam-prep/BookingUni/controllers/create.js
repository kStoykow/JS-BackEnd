const create = require('express').Router();

create.get('/', (req, res) => {
    res.render('create');
});

module.exports = create;