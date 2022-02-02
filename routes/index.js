var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'Express',
    layout: 'home',
    head: 'Login'
  });
});
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Express',
    layout: 'home',
    head: 'Login'
  });
});


module.exports = router;
