libraryApp.controller("userController", ['$scope', '$http','$rootScope','$state', function ($scope, $http,$rootScope,$state) {


    $scope.page = 1;
    $scope.limit = 5;
    $scope.disableBtn = false;
    $scope.previousButton = false;

    $scope.orderByField = 'firstName';
    $scope.reverseSort = false;



    console.log($rootScope.role,"$rootScope");

    if($rootScope.role == 'Normal')
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

        var req_data = {
            limit: $scope.limit,
            page: $scope.page
        };

        $http({

            method: 'GET',

            url: '/userList',

            params: req_data

        })
            .then(function success(response) {


                var responseObject = response.data.data;
                $scope.pageNum = true
                $scope.userListData = responseObject

                if ($scope.page == 1) {

                    $scope.totalCount = Number(response.data.count)
                    $scope.totalPage = Math.ceil($scope.totalCount / $scope.limit)

                    console.log($scope.totalPage);

                    if($scope.totalPage == 0 )
                    {
                        $scope.totalPage +=1;
                    }


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
    $scope.userList()



    $scope.sortFindOrderByName = 2;

    $scope.orderByName = function (m) {

        $scope.sortFindOrderByName += 1;
        function isEven(n) {
            return n % 2 == 0;
        }
        if (isEven($scope.sortFindOrderByName)) {
            $scope.userListData.sort(function(a, b){
                if(a[m] < b[m]) { return -1; }
                if(a[m] > b[m]) { return 1; }
                return 0;
            })
        } else {
            $scope.userListData.sort(function(a, b){
                if(a[m] < b[m]) { return 1; }
                if(a[m] > b[m]) { return -1; }
                return 0;
            })
        }

    };

    $scope.sortFindOrderByEmail = 2;

    $scope.orderByEmail = function (m) {

        $scope.sortFindOrderByEmail += 1;
        function isEven(n) {
            return n % 2 == 0;
        }
        if (isEven($scope.sortFindOrderByEmail)) {
            $scope.userListData.sort(function(a, b){
                if(a[m] < b[m]) { return -1; }
                if(a[m] > b[m]) { return 1; }
                return 0;
            })
        } else {
            $scope.userListData.sort(function(a, b){
                if(a[m] < b[m]) { return 1; }
                if(a[m] > b[m]) { return -1; }
                return 0;
            })
        }

    };


    $scope.previous_question = function () {
        $scope.page -= 1;
        $scope.userList()


    }

    $scope.next_question = function () {
        $scope.page += 1;
        $scope.userList()


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