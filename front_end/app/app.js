'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ui.router',
        'myApp.constants',
        'myApp.version',
        'myApp.register',
        'myApp.about',
        'myApp.login',
        'myApp.home',
        'myApp.userinfo',
        'myApp.dinninglist',
        'myApp.myinfo',
        'myApp.dinning',
        'myApp.reserve',
        'myApp.image'
    ])
    .config(['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/reserve');
    }])
    .filter('price', function () {
        return function (input) {

            return input + " 人/元";
        }
    })
    .filter('km', function () {
        return function (input) {

            return (input / 1000);
        }
    })
    .filter('distance', function () {
        return function (input) {

            return input + " km";
        }
    })
    .controller('TabCtrl', function ($scope, $location) {
        $scope.goHome = function () {
            $location.path('/home');
        };
        $scope.goUserInfo = function () {
            $location.path('/about');
        };
    });

angular.module('myApp.constants', [])
    .constant('userBaseUrl', 'http://202.120.40.175:21101')
    .constant('restaurantBaseUrl', 'http://202.120.40.175:21100');
