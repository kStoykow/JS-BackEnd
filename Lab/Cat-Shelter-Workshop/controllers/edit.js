const router = require('express').Router();
const { getCat, editCat, getBreeds } = require('../services/catsServices');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const cat = getCat(id);
    const breeds = getBreeds().filter(e => e != cat.breed);
    res.render('editCat', { cat, breeds })
});

router.post('/:id', (req, res) => {
    const id = req.params.id;
    const oldCat = getCat(id);
    const newCat = { name: req.body.name, id, description: req.body.description, breed: req.body.breed, image: oldCat.image }

    if (req.files) {
        req.files.upload.mv('./static/images/' + req.files.upload.name);
        newCat.image = './static/images/' + req.files.upload.name;
    }
    editCat(id, newCat);
    res.redirect('/');
})

module.exports = router;