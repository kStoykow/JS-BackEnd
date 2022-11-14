const router = require('express').Router();
const { getCat } = require('../services/catsServices');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const cat = getCat(id);
    res.render('details', cat);
});

module.exports = router;