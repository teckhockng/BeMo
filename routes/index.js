var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  if ( !req.isAuthenticated() ) {
    req.session.messages = []
    req.session.messages.push( 'Please login.' )

    return res.redirect( '/login' )
  }

  res.render('index', {
    title: 'Ultimate Guide to CDA Structured Interview: Tips & Proven Strategies to Help You Prepare & Ace Your CDA Interview',
  });
});

module.exports = router;
