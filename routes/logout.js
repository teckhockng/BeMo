var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // clear out any session messages
  req.session.messages = [];
  // end the user's session
  req.logout();

  // redirect to login
  res.redirect( '/login' );
});

module.exports = router;
