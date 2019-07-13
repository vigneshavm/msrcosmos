


var action = require ("../action/action.js");

var UIRoutes = function(app){
    this.app =app;
    this.actionInstance =new  action(app);


};


module.exports = UIRoutes;


UIRoutes.prototype.init = function()
{


    var self = this;

    var app = this.app;

    app.post("/signup",function(req,res){

        self.actionInstance.signUp(req,function(err,result){
            res.json(result)
        })

    });


    app.post("/login",function(req,res){

        self.actionInstance.login(req,function(err,result){
            res.json(result)
        })

    });




    app.get("/userList",function(req,res){

        self.actionInstance.getUserList(req,function(err,result){

            res.json(result)
        })


    });

    app.post("/addBook",function(req,res){
        self.actionInstance.addBook(req,function(err,result){


            res.json(result)
        })


    });


    app.get("/bookList",function(req,res){



        self.actionInstance.getBookList(req,function(err,result){

            res.json(result)
        })


    })

    app.post("/logout",function(req,res){

        console.log("enet logout result")
        self.actionInstance.logOut(req,function(err,result){
            console.log(result,"result")

            res.json(result)
        })
    })
 app.delete("/deleteBook",function(req,res){

        self.actionInstance.deleteBook(req,function(err,result){
            console.log(result,"result")

            res.json(result)
        })
    })

};