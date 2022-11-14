const router = require('express').Router();
const { getCats } = require('../services/catsServices');

router.get('/', (req, res) => {
    const search = req.query.search;
    const cats = getCats(search);
    res.render('home', { title: 'Cat Shelter', cats, search });
});

module.exports = router;