libraryApp.controller("userController", ['$scope', '$http','$rootScope', function ($scope, $http,$rootScope) {



    console.log($rootScope.role,"$rootScope");

    if($rootScope.role == 'normal')
    {
        $scope.navList = [


            {
                title: "Books",
                navUrl: "#/home/book",
                state: "home.book"
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
                title: "Books",
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



            });
    };
    $scope.userList()

}]);