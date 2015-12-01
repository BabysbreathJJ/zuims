'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ui.router',
        'myApp.version',
        'myApp.register',
        'myApp.about',
        'myApp.login',
        'myApp.home',
        'myApp.userinfo',
        'myApp.dinninglist',
        'myApp.myinfo'
    ])
    .config(['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/about');
    }])
    .controller('TabCtrl', function ($scope, $location) {
        $scope.goHome = function () {
            $location.path('/home');
        };
        $scope.goUserInfo = function () {
            $location.path('/about');
        };
    });
