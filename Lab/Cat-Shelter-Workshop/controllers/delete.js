const router = require('express').Router();

const { getCat, deleteCat } = require('../services/catsServices');

router.get('/:id', (req, res) => {
    const cat = getCat(req.params.id);
    if (cat.image.startsWith('.')) {
        cat.image = cat.image.substring(1);
    }
    res.render('delete', cat);
});

router.post('/:id', (req, res) => {
    deleteCat(req.params.id);
    res.redirect('/');
});

module.exports = router;