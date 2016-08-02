var express = require('express');
//var jwt = require('express-jwt');
//var app = express.app();
//var auth = jwt({secret: 'SECRET', userProperty: 'payload'})
var mongoose = require('mongoose');
var yelp = require("node-yelp");
//var passport = require('passport');
var Reg = require("./models/register");

//var Bar = require("./models/Bars");
//var User = mongoose.model('User');
//var Location = require("./models/Location");
module.exports = function(app, passport) {
    var express = require('express');
//var jwt = require('express-jwt');
//var app = express.app();
//var auth = jwt({secret: 'SECRET', userProperty: 'payload'})
var mongoose = require('mongoose');
var yelp = require("node-yelp");
//var passport = require('passport');
var Reg = require("./models/register");
   //  app.get('/', function(req, res, next) {
   //  res.render('index3', { title: 'Express' });
   // });

     app.get('/', function(req, res) {
        res.render('index3.ejs'); // load the index.ejs file
     });

      app.get('/fail', function(req, res) {
        res.render('fail.ejs'); // load the index.ejs file
     });

    app.post('/', isLoggedIn, function(req, res, next) { 
  var r = {re:req.body.location};
 var client = yelp.createClient({
   oauth: {
     "consumer_key": "07BSeMz5vajMDoPc1i02ng",
    "consumer_secret": "4rBHePhlcRH-SEkbmHRKLlLLbg0",
    "token": "8i9BMfEh8XttSzoUw-fb8T4C_tk6BVWH",
     "token_secret": "DYEUv11n8qjEVy0hysCeyUCjq58"
   },
  
 
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
 res.render("index2", { data:data});
     });
  }); 

   app.get('/signup', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // facebook routes
    // twitter routes

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/',
                    failureRedirect : '/fail'
            }));

};


   
  
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}



//app.get('/signup', function(req, res, next) {
 //   res.render('signup');
//});






 

