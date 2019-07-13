libraryApp.controller("userController", ['$scope', '$http','$rootScope','$state', function ($scope, $http,$rootScope,$state) {

    $scope.page = 0;
    $scope.limit = 5;


    console.log($rootScope.role,"$rootScope");

    if($rootScope.role == 'normal')
    {
        $scope.navList = [


            {
                title: "Books",
                navUrl: "#/book",
                state: "book"
            }

        ];

    }else{
        $scope.navList = [

            {
                title: "User Details",
                navUrl: "#/home",
                state: "home"
            },
            {
                title: "Manage Books",
                navUrl: "#/book",
                state: "book"
            },
            {
                title: "Add Books",
                navUrl: "#/addBook",
                state: "addBook"
            }

        ];
    }




    $scope.userList = function () {


        $http.get('/userList', {})

            .then(function (response) {
                var responseObject = response.data.data;

                console.log("responseObject",responseObject);
                $scope.userListData = responseObject
                $scope.pageNum = true

                $scope.totalCount = response.data.count

                console.log("$scope.totalCount", $scope.totalCount);

            });
    };
    $scope.userList()

    $scope.logout = function () {

        var req_data = {
            email : $rootScope.email


        };
        $http.post('/logout', req_data)

            .then(function (response) {
                $state.go("login")

            });
    };

}]);