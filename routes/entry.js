
var express = require('express');
var router = express.Router();
var Entry = require('../controllers/entry');

router.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', req.headers.origin || req.hostname);
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', "Content-Type");
    res.set('Access-Control-Allow-Credentials', "true");
    //res.set('Content-Type', 'application/json');
    next();
});
/* GET entries */
router.get('/', Entry.all);
router.get('/search', Entry.find);
router.get('/:id', Entry.findOne);

module.exports = router;