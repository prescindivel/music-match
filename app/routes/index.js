var express = require('express');
var router = express.Router();

router.get('/', function (res, req, next) {
  req.json({message: 'welcome'})
  console.log(req.sessionID);
});

module.exports = router;
