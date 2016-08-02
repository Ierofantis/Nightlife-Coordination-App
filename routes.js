var express = require('express');
//var jwt = require('express-jwt');
var router = express.Router();
//var auth = jwt({secret: 'SECRET', userProperty: 'payload'})
var mongoose = require('mongoose');
var yelp = require("node-yelp");
//var passport = require('passport');
var Reg = require("./models/register");

//var Bar = require("./models/Bars");
//var User = mongoose.model('User');
//var Location = require("./models/Location");

router.get('/', function(req, res, next) {
    res.render('index1', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});


router.post('/', function(req, res, next) { 
 var r = {re:req.body.location};
var client = yelp.createClient({
  oauth: {
    "consumer_key": "07BSeMz5vajMDoPc1i02ng",
    "consumer_secret": "4rBHePhlcRH-SEkbmHRKLlLLbg0",
    "token": "8i9BMfEh8XttSzoUw-fb8T4C_tk6BVWH",
    "token_secret": "DYEUv11n8qjEVy0hysCeyUCjq58"
  },
  
  // Optional settings: 
  httpClient: {
    maxSockets: 10 // ~> Default is 10 
  }
}); 

client.search({
  terms: "Nightlife",
  location: req.body.location
}).then(function (data) {
  var businesses = data.businesses;
  var location = data.region;


 
  // for (var i=0;i<businesses.length;i++){
  // console.log(businesses[i].name);
res.render("index", { data:data});
     
  
   });

});


 

module.exports = router;