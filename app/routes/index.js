var express = require('express');
var router = express.Router();

router.get('/', function (res, req, next) {
  req.json({message: 'welcome'});
});

module.exports = router;
