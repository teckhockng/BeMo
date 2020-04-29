var User = require( '../models/user' );
var passport = require( 'passport' );

/* ACTIONS */
exports.login = function ( req, res, next ) {
  passport.authenticate( 'local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: "Invalid Login"
  })( req, res, next )
};

exports.delete = function ( req, res, next ) {
  // clear out any session messages
  req.session.messages = [];
  // end the user's session
  req.logout();

  // redirect to login
  res.redirect( '/login' );
};
