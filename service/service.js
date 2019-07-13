

var mongojs = require('mongojs');
db = mongojs('localhost:27017/library');

var ServiceRoutes = function (app) {
    this.app = app;
};


module.exports = ServiceRoutes;


ServiceRoutes.prototype.findData = function (tableName, criteria, callback) {


    var self = this;
    var table = db[tableName];



    var condition = criteria.condition ? criteria.condition : {};
    var projection = criteria.projection ? criteria.projection : {};
    var sortOrder = criteria.sortOrder ? criteria.sortOrder : {};
    var limit = criteria.limit ? Number(criteria.limit) : 0;
    var skip = criteria.skip ? criteria.skip : 0;




    db[tableName].find(condition, projection).sort(sortOrder).skip(skip).limit(limit).toArray(function (err, data) {
        if (data) {
            callback(null,data)

        } else {
            callback(null,null)
        }
    });

};

ServiceRoutes.prototype.getCount = function (tableName, criteria, callback) {


    var self = this;
    var table = db[tableName];



    var condition = criteria.condition ? criteria.condition : {};
    var projection = criteria.projection ? criteria.projection : {};
    var sortOrder = criteria.sortOrder ? criteria.sortOrder : {};
    var limit = criteria.limit ? criteria.limit : 0;
    var skip = criteria.skip ? criteria.skip : 0;


    db[tableName].count(condition, function (err, data) {

        if (data) {
            callback(null,data)

        } else {
            callback(null,null)
        }
    });

};



ServiceRoutes.prototype.insertData = function (req,tableName, callback) {

    var response={};



    var table = db[tableName];


    db[tableName].insert(req, function(err, data) {
        if (data) {
            response = {
                status : true
            };

            callback(null,response)
        } else {

            response = {
                status : false
            };
            callback(null,response)
        }
    });

}
ServiceRoutes.prototype.updateUserData = function (tableName,condition,updateData, callback) {



    var response ={}



    db[tableName].update(condition, { $set: updateData },   { upsert: true },
        function(err, data) {

            console.log("data",data)
            if (data) {

                response ={
                    status : true
                }

                callback(null, response)
            } else {
                response ={
                    status : false
                }
                callback(null, response)
            }
        })
}

ServiceRoutes.prototype.deleteData = function (tableName, criteria, callback) {


    var self = this;
    var table = db[tableName];






    db[tableName].remove(criteria, function(err, data) {
        if (data) {
            callback(null,data)

        } else {
            callback(null,null)
        }
    });

};


