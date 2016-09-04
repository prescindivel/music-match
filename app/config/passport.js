/*jslint node: true */
"use strict";

var facebookStrategy = require('passport-facebook').Strategy;
var User             = require('../models/user');
var auth             = require('./auth');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  passport.use(new facebookStrategy({
    clientID      : auth.facebook.clientID,
    clientSecret  : auth.facebook.clientSecret,
    callbackURL   : auth.facebook.callbackURL,
    profileFields : auth.facebook.profileFields,
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({'facebook.id': profile.id }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        var newUser = new User();

        newUser.facebook.id    = profile.id;
        newUser.facebook.token = accessToken;
        newUser.facebook.name  = profile.displayName;
        newUser.facebook.email = profile.emails[0].value;

        newUser.save(function(err) {
          if (err) {
            throw err;
          }
          console.log(profile)
          return done(null, newUser);
        });
      });
    });
  }));
};
