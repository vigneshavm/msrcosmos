var libraryApp = angular.module('libraryApp', ['ui.router']);

libraryApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('login', {
            url: '/login',
            templateUrl: "app/views/login.html",
            controller: "loginController",
            resolve: {
                message: function ($http, $window, $rootScope) {
                }
            }
        })

        .state('signup', {
            url: '/signup',
            templateUrl: "app/views/signup.html",
            controller: "signupController",
            resolve: {
                message: function ($http, $window, $rootScope) {
                }
            }
        })

        // nested list with custom controller
        .state('home', {
            url: '/home',
            templateUrl: "app/views/userList.html",
            controller: "userController",
            resolve: {
                message: function ($http, $window, $rootScope) {
                }
            }
        })

        .state('book', {
            url: '/book',
            templateUrl: "app/views/bookList.html",
            controller: "bookController",
            resolve: {
                message: function ($http, $window, $rootScope) {
                }
            }
        })
        .state('addBook', {
            url: '/addBook',
            templateUrl: "app/views/addBook.html",
            controller: "addBookController",
            resolve: {
                message: function ($http, $window, $rootScope) {
                }
            }
        })


});
