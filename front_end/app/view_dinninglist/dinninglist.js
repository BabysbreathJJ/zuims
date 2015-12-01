/**
 * Created by Lijingjing on 15/11/28.
 */

'use strict';

angular.module('myApp.dinninglist', ['ngAnimate', 'ui.router', 'myApp.constants'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {

        $stateProvider
        //.state('dinninglist',{
        //    url: '/dinninglist/:search-word',
        //    templateUrl: 'view_dinninglist/dinninglist.html',
        //    controller: 'DinninglistCtrl'
        //});
        // route to show our basic form (/form)
            .state('dinninglist', {
                url: '/dinninglist?search&city',
                templateUrl: 'view_dinninglist/dinninglist.html',
                controller: 'DinninglistCtrl'
            });

    }])
    .filter('price', function () {
        return function (input) {

            return input + " 人/元";
        }
    })
    .factory('DinningListService', ['$http', 'restaurantBaseUrl', function ($http, restaurantBaseUrl) {
        //var baseUrl = "http://202.120.40.175:21100";

        var getRestaurantsRequest = function (keyword) {
            return $http({
                method: 'GET',
                url: restaurantBaseUrl + '/restaurants/search?text=' + keyword,
                crossDomain: true
            });
        };

        var getRecommandRequest = function (cname) {
            return $http({
                method: 'GET',
                url: restaurantBaseUrl + '/restaurants/recommand/city?cname=' + cname,
                crossDomain: true
            });
        };

        return {
            getRestaurants: function (keyword) {
                return getRestaurantsRequest(keyword);
            },
            getRecommand : function(city){
                return getRecommandRequest(city);
            }
        }

    }])
    .controller('DinninglistCtrl', function ($scope, $stateParams, DinningListService, $state) {
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        console.log($stateParams.search);

        DinningListService.getRestaurants($stateParams.search)
            .success(function (data) {
                $scope.results = data;
            });
        $scope.city = $stateParams.city;
        console.log($scope.city);


        $scope.dinningDetail = function (restaurantId) {
            $state.go('dinning', {id: restaurantId});
        };


        $scope.change = function(cname){
            DinningListService.getRecommand(cname)
                .success(function(data){
                    $scope.results = data;
                });
        };

    });
