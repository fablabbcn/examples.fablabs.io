var express = require('express');
var router = express.Router();
var config = require('../config');
var querystring = require('querystring')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FabLabs.io Express Demo', 
  token: req.session.token,
  profile: req.session.profile });
});

router.get('/login', function(req, res, ext) {
  res.redirect('/auth/fablabs');
});

router.get('/logout', function(req,res){
  req.session.token = null;
  req.session.profile = null;
  res.redirect('/');
});


module.exports = router;
