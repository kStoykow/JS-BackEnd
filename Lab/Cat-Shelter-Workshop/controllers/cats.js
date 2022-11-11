const router = require('express').Router();
const { addBreed, getCats } = require('../services/catsServices');


router.get('/addBreed', (req, res) => res.render('addBreed'));

router.post('/addBreed', (req, res) => {
    addBreed(req.body.breed);
    res.redirect('/cats/addCat')
});

router.get('/addCat', (req, res) => {
    const breeds = require('../services/breeds.json');
    res.render('addCat', { breeds })
});

router.post('/addCat', (req, res) => {
    const cats = getCats();
    console.log(cats);
    res.render('details', { cats });
});

module.exports = router;