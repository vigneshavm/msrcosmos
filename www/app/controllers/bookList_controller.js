libraryApp.controller("bookController", ['$scope', '$http','$rootScope', function ($scope, $http,$rootScope) {




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
    $scope.getBookList = function () {

        var req_data = {
            email: $scope.email,
            password: $scope.password
        };
        $http.get('/bookList', req_data)

            .then(function (response) {
                var responseObject = response.data.data;

                console.log("responseObject",responseObject);
                $scope.bookList = responseObject



            });
    };
    $scope.getBookList()

    }]);
