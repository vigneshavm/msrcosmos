

libraryApp.controller("loginController", ['$scope', '$http','$rootScope','$state', function ($scope, $http,$rootScope,$state) {
    $scope.$state = $state;


    $scope.userLogin = function () {

            var req_data = {
                email: $scope.email,
                password: $scope.password
            };
            $http.post('/login', req_data)

                .then(function (response) {
                    var responseObject = response.data;

                    if(responseObject.status){
                        $scope.login_info = "Login successfully";


                        $rootScope.email = responseObject.data[0].email;
                        $rootScope.role = responseObject.data[0].role;

                        console.log("$rootScope.role ",$rootScope.role )

                        if($rootScope.role == 'Normal')
                        {
                            $state.go("book");
                        }else {
                            $state.go("home");
                        }



                    }else{
                        $scope.login_info = "Email and Password Mismatch";
                    }

                });
        }
    $scope.signup = function () {


                            $state.go("signup");

        }
    }]
);
