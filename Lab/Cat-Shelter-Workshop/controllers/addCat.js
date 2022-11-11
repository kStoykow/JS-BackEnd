const router = require('express').Router();

router.get('/addCat', (req, res) => res.render('addCat'));

module.exports = router;