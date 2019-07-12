

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
    var limit = criteria.limit ? criteria.limit : 0;
    var skip = criteria.skip ? criteria.skip : 0;




    db[tableName].find(condition, projection).sort(sortOrder).skip(skip).limit(limit).toArray(function (err, data) {
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
ServiceRoutes.prototype.updateUserData = function (condition,updateData, callback) {



    var response ={}



    db.user.update(condition, {
            $set: updateData
        },
        function(err, data) {
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
