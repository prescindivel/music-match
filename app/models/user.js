/*jslint node: true */
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var bcrypt = require('bcrypt');
// var SALT_WORK_FACTOR = 10;


var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);

// userSchema.pre('save', function(next) {
//   var user = this;

//   if (!user.isModified('password')) return next();
//   bcrypt.genSalt(10, function(err, salt) {
//     if (err) return next(err);
//     bcrypt.hash(user.password, salt, function(err, hash){
//       if (err) return next();

//       user.password = hash;
//       next();
//     });
//   });
// });


// userSchema.methods.comparePassword = function(attemptedPassword, callback) {
//   bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
//     if (err) return callback(err);
//     callback(null, isMatch);
//   });
// };

module.exports = mongoose.model('userSchema', userSchema);
