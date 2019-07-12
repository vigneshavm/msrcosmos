


var service = require ("../service/service.js");

var ActionRoutes = function(app){
    this.app =app;
    this.serviceInstance = new  service(app);


};


module.exports = ActionRoutes;

