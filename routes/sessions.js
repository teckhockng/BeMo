var express = require('express');
var router = express.Router();

// create a link to our sessions controller
var sessionsController = require('../controllers/sessionsController');
/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'Login Page',
  });
});

router.post( '/', sessionsController.login );

module.exports = router;
