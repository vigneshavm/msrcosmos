

var async = require("async");
var moment = require("moment");


var service = require ("../service/service.js");

var ActionRoutes = function(app){
    this.app =app;
    this.serviceInstance = new  service(app);


};


module.exports = ActionRoutes;


ActionRoutes.prototype.signUp = function (req,callback){

    var self = this;

    var  reqObj= req.body;

    var resObject ={};

    var inputObject ={
        firstName : reqObj.firstName,
        lastName :reqObj.lastName,
        email :reqObj.email,
        phoneNumber :reqObj.phoneNumber,
        password :reqObj.password,
        role:reqObj.role
    };

    var tableName= 'user';


    var criteria={
        condition : {email : reqObj.email}
    };
    self.serviceInstance.findData(tableName, criteria, function (err,res){



        if(res && res.length) {
            resObject= {
                status:false,
                data :res,
                statusCode :100,
                message : 'Email Already Exist'
            };

            callback(null,resObject)
        }else{
            self.serviceInstance.insertData(inputObject,tableName,function(err,res){
                if(res){

                    resObject= {
                        status:true,
                        data :res,
                        message : 'User Created Successfully'
                    };

                    callback(null,resObject)

                }else{
                    resObject= {
                        status:false,
                        data :res,
                        message : 'User Creation Failed'
                    };
                    callback(null,resObject)

                }

            })
        }
    })
};
ActionRoutes.prototype.login = function (req,callback){


    var self = this;

    var  reqObj= req.body;

    console.log(reqObj,"Input object for login")



    var resObject ={};


    var tableName= 'user';

    var criteria={
        condition :  {email : reqObj.email,password :reqObj.password},
        sortOrder : {_id:1}
    };
    self.serviceInstance.findData(tableName, criteria, function (err,userResponse){




        if(userResponse.length){



            var inputObject ={
                email :reqObj.email,
                loginTime : new Date().getTime()
            };

            var tableName = "loginStatus";


            self.serviceInstance.insertData(inputObject,tableName,function(err,res){
                if(res){

                    resObject= {
                        status:true,
                        data :userResponse,
                        message : 'Login Successfully'
                    };

                    callback(null,resObject)

                }else{
                    resObject= {
                        status:false,
                        data :res,
                        message : 'Login failed'
                    };
                    callback(null,resObject)

                }

            })




        }else{


            resObject= {
                status:false,
                data :userResponse,
                message : 'emailID and password mismatch'
            };
            callback(null,resObject)

        }

    })


};
ActionRoutes.prototype.getUserList = function (req,callback){


    var self = this;

    var  reqObj= req.query;


    var resObject ={};

    var tableName= 'user';




    var criteria={
        condition :  {
            role: { $ne: 'Admin' }
        },
        sortOrder : {_id: -1}
    };
    self.serviceInstance.getCount(tableName, criteria, function (err,userCount) {





            var criteria={
                condition :  {
                    role: { $ne: 'Admin' }
                },
                sortOrder :{
                    _id:-1
                },
                limit : Number(reqObj.limit),
                skip : Number((reqObj.page - 1) * Number(reqObj.limit))

            };


        self.serviceInstance.findData(tableName, criteria, function (err, UserRes) {


            if (UserRes.length) {

                async.forEach(UserRes, function (singleObj, forEachCbk) {

                    var tableName = 'loginStatus';


                    var criteria = {
                        condition: {email: singleObj.email},
                        sortOrder: {_id: -1},
                        limit: 1
                    };

                    console.log("criteria", criteria);
                    self.serviceInstance.findData(tableName, criteria, function (err, res) {
                        console.log(res, "res");

                        if(res.length){

                        singleObj['lastLoginTime'] = res[0].loginTime ? moment(res[0].loginTime).format('YYYY-MM-DD HH:mm:ss') : '';
                        singleObj['logOutStatus'] = res[0].logOutStatus ? 'Offline' : 'Online';
                        singleObj['logOutTime'] = res[0].logOutTime ? moment(res[0].logOutTime).format('YYYY-MM-DD HH:mm:ss') : '';

                            forEachCbk(null, singleObj);
                        }else{
                            singleObj['lastLoginTime'] =  'Not Yet Login';
                            singleObj['logOutStatus'] = 'Not Used Yet';
                            singleObj['logOutTime'] = '';
                            forEachCbk(null, singleObj);
                        }


                    })

                }, function (result2) {

                    resObject = {
                        status: true,
                        data: UserRes,
                        count: userCount,
                        description: 'Message available'
                    };

                    callback(null, resObject)
                })


            }
            else {


                resObject = {
                    status: false,
                    data: [],
                    count: 0
                };
                callback(null, resObject)

            }

        })

    })
};


ActionRoutes.prototype.addBook = function (req,callback){


    var self = this;

    var  reqObj= req.body;




    var resObject ={};


    var tableName= 'book';


    var criteria={
        condition : {book : reqObj.book},
        sortOrder : {_id:1}
    };

    self.serviceInstance.findData(tableName, criteria, function (err,res){

        if(res.length){



            resObject= {
                status:false,
                statusCode:100,
                data :res,
                message : 'Book Already Exists'
            };
            callback(null,resObject)




        }else{


            function makeid(length) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }



            var inputObject ={
                book : reqObj.book,
                publishedDate :reqObj.publishedDate,
                author :reqObj.author,
                quality :reqObj.quality,
                addedTime : new  Date().getTime(),
                bookID : makeid(5)

            };

            var tableName = "book";


            self.serviceInstance.insertData(inputObject,tableName,function(err,res){
                if(res){

                    resObject= {
                        status:true,
                        data :res,
                        message : 'Book added Successfully'
                    };

                    callback(null,resObject)

                }else{
                    resObject= {
                        status:false,
                        data :res,
                        message : 'Book not able to add - failed'
                    };
                    callback(null,resObject)

                }

            })

        }

    })


};

ActionRoutes.prototype.getBookList = function (req,callback){


    var self = this;

    var  reqObj= req.query;

    console.log("reqObj",req.query)


    var resObject ={};

    var tableName= 'book';
    var criteria={
        condition : {
        }
    };
    self.serviceInstance.getCount(tableName, criteria, function (err,recordCount){

        var criteria={
            condition : {
            },
            sortOrder :{
                _id:-1
            },
            limit : Number(reqObj.limit),
            skip : Number((reqObj.page - 1) * Number(reqObj.limit))

        };


        console.log("criteria", criteria);
        self.serviceInstance.findData(tableName, criteria, function (err,res){


        if(res.length){

            async.forEach(res, function (singleObj, forEachCbk) {

                singleObj['publisehedSec'] = moment(singleObj.publishedDate,"D/M/YYYY").unix()
                forEachCbk(null, singleObj);

             }, function (result2) {
                resObject = {
                    status: true,
                    data: res,
                    count: recordCount
                };

                callback(null, resObject)
            })

        }else{


            resObject= {
                status:false,
                data :[],
                count :0
            };
            callback(null,resObject)

        }

    })
    })


};


ActionRoutes.prototype.logOut = function (req,callback){


    var self = this;

    var  reqObj= req.body;




    var resObject ={};


    var tableName= 'loginStatus';


    var criteria={
        condition : {email : reqObj.email},
        sortOrder : {_id:-1},
        limit :1
    };

    console.log("criteria", criteria);

    self.serviceInstance.findData(tableName, criteria, function (err,res){

        console.log("res-", res);

        if(res.length){


                var condition ={
                    loginTime : res[0].loginTime
                };

            var updateData ={
                logOutStatus : true,
                logOutTime : new  Date().getTime()
            }




                self.serviceInstance.updateUserData(tableName,condition,updateData,function(err,res){
                    if(res){

                        resObject= {
                            status:true,
                            data :res,
                            message : 'Book added Successfully'
                        };

                        callback(null,resObject)

                    }else{
                        resObject= {
                            status:false,
                            data :res,
                            message : 'Book not able to add - failed'
                        };
                        callback(null,resObject)

                    }

                })



        }else{
            resObject = {
                status: false,
                statusCode: 100,
                data: res,
                message: 'Logout Failed'
            };
            callback(null, resObject)



        }

    })


};
ActionRoutes.prototype.deleteBook = function (req,callback){


    var self = this;


    var  reqObj1= req.query;


    var tableName = 'book';

    var criteria ={
        bookID : reqObj1.bookID

    };
    self.serviceInstance.deleteData(tableName, criteria, function (err,res){

        console.log("res", res);

        if(res){

            resObject= {
                status:true,
                data : res,
            };

            callback(null,resObject)

        }else{


            resObject= {
                status:false,
                data :[]
            };
            callback(null,resObject)

        }

    })


};