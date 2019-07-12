var express = require("express");

var app =  express();


app.listen (8900 ,function(){
    console.log("server running " + 8900)

});

var WebRoutes = require ("./routes/routes.js");
var webRoutes  = new WebRoutes(app);
webRoutes.init();
