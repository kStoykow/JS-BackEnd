const router = require('express').Router();
const { addBreed, addCat } = require('../services/catsServices');


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
    let img = req.files.upload;
    img.mv('./static/images/' + img.name);

    const id = ('0000' + Math.trunc(Math.random() * 9999)).slice(-4);
    const newCat = { id, name: req.body.name, description: req.body.description, breed: req.body.breed, image: './static/images/' + img.name };

    addCat(newCat);
    res.redirect('/');
});

module.exports = router;