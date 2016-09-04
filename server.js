/*jslint node: true */
"use strict";

var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var passport       = require('passport');
var flash          = require('connect-flash');

var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var methodOverride = require('method-override');
var session        = require('express-session');

var db             = require('./app/config/db');
mongoose.connect(db.url);

require('./app/config/passport')(passport);

// CONFIG app
// ==============================================
app.set('json spaces', 2);
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.use(session({ secret: 'nyan cat', saveUninitialized: true,  resave: false, cookie: { secure: true }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ROUTES
// ==============================================
var routes = require('./app/routes')(passport);
// root
app.use('/', routes);
// 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// ERROR handler
// ==============================================
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// START THE SERVER
// ==============================================
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;
