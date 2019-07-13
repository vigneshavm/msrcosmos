


libraryApp.controller("signupController", ['$scope', '$http','$rootScope','$state', function ($scope, $http,$rootScope,$state) {

    $scope.signup = {}
    $scope.signUp_info =''
    $scope.role = ["Admin", "Normal"];
    $scope.signup.role = 'Admin'


    $scope.loginPage = function () {

        $state.go('login')
    }
    

    $scope.saveSignUp = function () {

$scope.fieldValidation = true;
        if ($scope.signup.firstName==null || $scope.signup.firstName==""){
            alert("firstName can't be blank");
            $scope.fieldValidation = false;
            return false;
        }

        if ($scope.signup.lastName==null || $scope.signup.lastName==""){
            alert("lastName  can't be blank");
            $scope.fieldValidation = false;
            return false;
        }

        console.log($scope.signup.email, "$scope.signup.email");
        if ($scope.signup.email==null || $scope.signup.email==""){
            alert("email can't be blank");

            $scope.fieldValidation = false;
            return false;
        }else{
            function ValidateEmail(mail)
            {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
                {
                }else{
                alert("You have entered an invalid email address!");
                    $scope.fieldValidation = false;
                    return false;
                }
            }
            ValidateEmail($scope.signup.email)
        }

        if ($scope.signup.password==null || $scope.signup.password==""){
            alert("password can't be blank");

            $scope.fieldValidation = false;
            return false;
        }
if($scope.signup.phoneNumber)
{

    var phoneno = /^\d{10}$/;
    if(($scope.signup.phoneNumber.match(phoneno)))
    {
    }
    else
    {
        alert("Invalid Phone Number");
        $scope.fieldValidation = false;
        return false;
    }

}




        if($scope.fieldValidation){
    var req_data = {
        firstName: $scope.signup.firstName,
        lastName: $scope.signup.lastName,
        email: $scope.signup.email,
        phoneNumber: $scope.signup.phoneNumber,
        password: $scope.signup.password,
        role: $scope.signup.role



    };
    $http.post('/signup', req_data)

        .then(function (response) {
            var responseObject = response.data;

            if(responseObject.status){
                $scope.signUp_info = "User created successfully"


                setTimeout(function(){  $state.go('login') }, 3000);

            }else{
                
                    $scope.signUp_info = responseObject.message

            }



        });
};
}
    }]);
