/*jslint node: true */
"use strict";

var express = require('express');
var router  = express.Router();

module.exports = function (passport) {
  router.get('/', function (res, req) {
    req.json({message: 'welcome'});
  });

  router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
  router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/error' }));

  return router;
};
