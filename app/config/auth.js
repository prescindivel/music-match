/*jslint node: true */
"use strict";

var config = {
  'facebook' : {
    'clientID'  : '944581648986631',
    'clientSecret' : '53f41ba2b78b2684d38b96cbc30a61ea',
    'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
    'profileFields': ['id', 'displayName', 'name', 'profileUrl', 'email', 'gender']
  }
};

module.exports = config;
