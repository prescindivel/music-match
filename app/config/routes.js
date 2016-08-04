/*jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
var passport = require('passport');
var user = require('../models/user');

var response = {};

router.get('/', function (res, req) {
  req.json({message: 'welcome'});
  console.log(req.params);
});

router.get('/users', function (req,res) {
  user.find({},function(err,data){
    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
    } else {
      response = {"error" : false, "users" : data};
    }
    res.json(response);
  });
});

router.post('/register', function(req, res, next){

  user.register(new user({ username: req.body.username }, {password: req.body.password}), function(err, account) {
    if (err) {
      res.json({ error : err });
    }

    passport.authenticate('local'),(function (req, res){
      req.session.save(function (err) {
        if (err && res.statusCode == 200) {
          console.log(err);
        }
        res.redirect('/users');
      });
    });
  });
});

router.route("/users/:id")
.get(function(req,res){
  var response = {};
  user.findById(req.params.id,function(err,data){
    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
    } else {
      response = {"error" : false, "user" : data};
    }
    res.json(response);
  });
});


module.exports = router;
