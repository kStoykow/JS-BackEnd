const router = require('express').Router();
const { getCats } = require('../services/catsServices');

router.get('/', (req, res) => {
    const cats = getCats();
    res.render('home', { title: 'Cat Shelter', cats })
});

module.exports = router;