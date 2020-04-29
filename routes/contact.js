var express = require('express');
var router = express.Router();

var contactController = require('../controllers/contactController');

/* GET contact page. */
router.get('/', function(req, res, next) {
  if ( !req.isAuthenticated() ) {
    req.session.messages = []
    req.session.messages.push( 'Please login.' )

    return res.redirect( '/login' )
  }
  res.render('contact', {
    title: 'Contact Us',
  });
});

router.post( '/', contactController.send );

module.exports = router;
