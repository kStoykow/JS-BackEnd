const router = require('express').Router();

router.get('/addBreed', (req, res) => res.render('addBreed'));

module.exports = router;