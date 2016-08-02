var express = require('express');
require('dotenv').load();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var routes = require('./routes');
var session = require("express-session");

mongoose.connect('mongodb://localhost/myapp', function (error){
   
   if (error) console.error(error);
   else console.log("mongo connected")

});
var app = express();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);





app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});