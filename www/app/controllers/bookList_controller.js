libraryApp.controller("bookController", ['$scope', '$http', '$rootScope','$state', function ($scope, $http, $rootScope,$state) {

    $scope.page = 1;
    $scope.limit = 5;
    $scope.disableBtn = false;
    $scope.previousButton = false;


    if ($rootScope.role == 'normal') {
        $scope.navList = [


            {
                title: "Books",
                navUrl: "#/home/book",
                state: "home.book"
            }

        ];

    } else {
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
            limit: $scope.limit,
            page: $scope.page
        };

        $http({

            method: 'GET',

            url: '/bookList',

            params: req_data

        }).then(function success(response) {


            var responseObject = response.data.data;
            $scope.pageNum = true
            $scope.bookList = responseObject

            if ($scope.page == 1) {

                $scope.totalCount = Number(response.data.count)
                $scope.totalPage = Math.ceil($scope.totalCount / $scope.limit)


            }


            if (($scope.totalPage < $scope.page) || ($scope.totalPage == $scope.page)) {
                $scope.nextButton = true
            } else {
                $scope.nextButton = false
            }


            if (($scope.page == 1) || ($scope.page == 0)) {

                $scope.previousButton = true
            } else {
                $scope.previousButton = false
            }


        });
    };
    $scope.getBookList()


    $scope.previous_question = function () {
        $scope.page -= 1;
        $scope.getBookList()


    }

    $scope.next_question = function () {
        $scope.page += 1;
        $scope.getBookList()


    }


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
