var express = require('express');
var path = require('path');
var sassMiddleware = require('node-sass-middleware');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var contactRouter = require('./routes/contact');
var sessionsRouter = require('./routes/sessions');
var logoutRouter = require('./routes/logout');

var app = express();

require('dotenv').config({ path: 'variables.env' });

// use mongoose to connect to mongo
var mongoose = require( 'mongoose' );
var config = require( './config/connect' );

// our connection
mongoose.connect( config.db );

// authentication
const passport = require( 'passport' );
const session = require( 'express-session' );
const localStrategy = require( 'passport-local' ).Strategy;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// PASSPORT CONFIGURATION
app.use( session({
  secret: 'any string for salting here', // salt key for hashing
  resave: true, // stop user from being logged out
  saveUninitialized: false // don't start a session if guest
}));

app.use( passport.initialize() );
app.use( passport.session() );

// reference User model
const User = require( './models/user' );
passport.use( User.createStrategy() );

// session management for users
passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );

// our helper
app.use( function ( req, res, next ) {
  res.locals.authenticated = req.isAuthenticated()
  next()
})
// END OF PASSPORT CONFIGURATION

// this is our home route
app.use('/', indexRouter);
app.use('/contact', contactRouter);
app.use('/login', sessionsRouter);
app.use('/logout', logoutRouter);

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
