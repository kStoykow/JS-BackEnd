const router = require('express').Router();

router.get('/', (req, res) => {
    const cats = require('../data/cats.json');
    res.render('home', { title: 'Cat Shelter', cats })
});

module.exports = router;