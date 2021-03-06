module.exports = function(app, passport) {

    var express = require('express');
    var mongoose = require('mongoose');
    var yelp = require("node-yelp");
    var Reg = require("./models/register");
    var User = require("./models/user");
    var Name = require("./models/name");

    app.get('/', function(req, res) {
        res.render('index3.ejs'); // load the index.ejs file
    });

    app.get('/fail', function(req, res) {
        res.render('fail.ejs'); // load the index.ejs file
    });

    app.post('/destroy/:id', function(req, res) {
        var id = req.params.id;
        Name.findByIdAndRemove(id, req.body, function(err, user) {
            user.remove(function(err, user) {
                res.redirect('/profile/name');
            })
        })
    })

    app.post('/', function(req, res, next) {

        var client = yelp.createClient({
            oauth: {
                "consumer_key": "07BSeMz5vajMDoPc1i02ng",
                "consumer_secret": "4rBHePhlcRH-SEkbmHRKLlLLbg0",
                "token": "8i9BMfEh8XttSzoUw-fb8T4C_tk6BVWH",
                "token_secret": "DYEUv11n8qjEVy0hysCeyUCjq58"
            },
            httpClient: {
                maxSockets: 10
            }
        });

        client.search({
            terms: "Nightlife",
            location: req.body.location
        }).then(function(data) {
            var businesses = data.businesses;
            var location = data.region;
            res.render("index2", { data: data });
        });
    });

    app.get('/signup', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/profile', isLoggedIn, function(req, res) {        
        res.render('profile.ejs', {
            user: req.user
        });
    });

    app.post("/submit", isLoggedIn, function(req, res, next) {

        var name = req.body.name;
        var reqName = req.user.google.name;
        var n = new Name({ name: name, reqName: reqName });
        n.save(function(err, names) {
            res.redirect('/profile/name');
        });
    });

    app.get("/profile/name", isLoggedIn, function(req, res) {
        
        var name = req.params.name;
        var names = req.params.names;
        var reqName = req.params.reqName;

        Name.find({
            reqName: req.user.google.name,
            names: names
        }, function(err, data) {
            if (err) { return next(err); }
            res.render("titles", { data: data});            
        });
    });

    app.get("/titles", function(req, res) {
        res.render("titles", { data: data });
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/fail'
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