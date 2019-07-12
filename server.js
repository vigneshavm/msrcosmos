var express = require("express");

var app =  express();

var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');

//Global variable
global.appRoot = path.resolve(__dirname);


//ExpressJS middleware
app.use(express.static(__dirname + '/www'));
app.set('views', __dirname + '/www/app/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(session({secret: 'keyboard cat', cookie: {maxAge: 3600000}}));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(bodyParser.json({ type: 'application/*+json' }));

app.listen (8900 ,function(){
    console.log("server running " + 8900)

});

var WebRoutes = require ("./routes/routes.js");
var webRoutes  = new WebRoutes(app);
webRoutes.init();
