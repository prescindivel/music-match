var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.get('/', function (res, req, next) {
  req.json({message: 'welcome'});
  console.log(req.params);
});

router.route("/users")
.get(function(req,res){
  var response = {};
  user.find({},function(err,data){
    if(err) {
      response = {"error" : true,"message" : "Error fetching data"};
    } else {
      response = {"error" : false,"message" : data};
    }
    res.json(response);
  })
})
.post(function(req, res){
  var newUser = user();
  var response = {};

  newUser.email = req.body.email;
  newUser.password = require('crypto')
                          .createHash('sha1')
                          .update(req.body.password)
                          .digest('base64');

  newUser.save(function(err) {
    if (err) {
      response = {"error" : true, "message" : "Error adding data"};
    } else {
      response = {"error" : false, "message" : "Data added"};
    }
    res.json(response);
  })
});

router.route("/users/:id")
.get(function(req,res){
  var response = {};
  user.findById(req.params.id,function(err,data){
    if(err) {
      response = {"error" : true,"message" : "Error fetching data"};
    } else {
      response = {"error" : false,"message" : data};
    }
    res.json(response);
  });
});


module.exports = router;
