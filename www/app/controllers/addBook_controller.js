


libraryApp.controller("addBookController", ['$scope', '$http','$rootScope','$state', function ($scope, $http,$rootScope,$state) {

    $scope.bookDetails = {}

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

    if($rootScope.role == 'normal')
    {
        $scope.navList = [


            {
                title: "Books",
                navUrl: "#/book",
                state: "book"
            }

        ];

        $scope.editField = true
        $scope.deleteField = true

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

    ]

        $scope.editField = false
        $scope.deleteField = false
    }


    $scope.saveBookDetails = function () {

$scope.fieldValidation = true;
        if ($scope.bookDetails.name==null || $scope.bookDetails.name==""){
            alert("Book Name can't be blank");
            $scope.fieldValidation = false;
            return false;
        }

        if ($scope.bookDetails.author==null || $scope.bookDetails.author==""){
            alert("author Name can't be blank");
            $scope.fieldValidation = false;
            return false;
        }
        if ($scope.bookDetails.quality==null || $scope.bookDetails.quality==""){
            alert("quality can't be blank");

            $scope.fieldValidation = false;
            return false;
        }else {
            if(/\D/.test($scope.bookDetails.quality))
            {

                alert("quality should be number");

                $scope.fieldValidation = false;
                return false;
            }
        }

        if ($scope.bookDetails.publishedDate==null || $scope.bookDetails.publishedDate==""){



                alert("publishedDate can't be blank");

            $scope.fieldValidation = false;
            return false;

        }else{
            function validatedate(inputText)
            {
                var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
                if(inputText.match(dateformat))
                {

                    if(moment(inputText, 'D/M/YYYY',true).isValid())
                    {

                    }else
                    {
                        console.log("false");
                        $scope.fieldValidation = false;
                        alert("Invalid date format!");
                        return false;
                    }
                        }
                else
                {
                    alert("Invalid date");
                    $scope.fieldValidation = false;
                    return false;
                }
            }

            validatedate($scope.bookDetails.publishedDate)
        }



if($scope.fieldValidation){
    var req_data = {
        book: $scope.bookDetails.name,
        publishedDate: $scope.bookDetails.publishedDate,
        author: $scope.bookDetails.author,
        quality: $scope.bookDetails.quality


    };
    $http.post('/addBook', req_data)

        .then(function (response) {
            var responseObject = response.data;

            if(responseObject.status){
                $scope.book_info = "Book added successfully"

            }else{
                if(responseObject.statusCode == 100){
                    $scope.book_info = responseObject.message;
                }else{
                    $scope.book_info = "Not able to add";
                }

            }



        });
};
}



  $scope.logout = function () {

        var req_data = {
            email : $rootScope.email


        };

      console.log("req_data",req_data);
      $http.post('/logout', req_data)

            .then(function (response) {
                $state.go("login")

            });
    };

    }]);
