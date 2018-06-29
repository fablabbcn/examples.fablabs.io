var express = require('express');
var router = express.Router();
var config = require('../config');
var querystring = require('querystring');
var axios = require('axios');
var fablabs = require('../fablabs');


/* GET home page. */
router.get('/callback', function(req, res, next) {
    
    var handleError = function(error){
        console.log(error)
        res.redirect('/');
    }
    
    console.log(req.query.code)
    axios.post( config.base_url + config.token_url, querystring.stringify({
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: config.redirect_url
      }),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(result){
        console.log(result.data)
        req.session.token = result.data
     
        fablabs.getUser(result.data.access_token).then(function(user_data){
            console.log(user_data)
            req.session.profile = user_data;
            res.redirect('/');
        }).catch(handleError)
    }).catch(handleError)
});

router.get('/fablabs', function(req, res, ext) {
    const location =  config.base_url + config.authorize_url + '?' + querystring.stringify({
        'client_id' : config.client_id,
        'redirect_uri': config.redirect_url,
        'response_type': 'code'
      })
    
      res.redirect(location)
});


module.exports = router;
