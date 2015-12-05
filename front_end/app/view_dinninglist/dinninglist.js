/**
 * Created by Lijingjing on 15/11/28.
 */

'use strict';

angular.module('myApp.dinninglist', ['ngAnimate', 'ui.router', 'myApp.constants'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {

        $stateProvider
            .state('dinninglist', {
                url: '/dinninglist?search&city&longitude&latitude',
                templateUrl: 'view_dinninglist/dinninglist.html',
                controller: 'DinninglistCtrl'
            });

    }])
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
            getRecommand: function (city) {
                return getRecommandRequest(city);
            }
        }

    }])
    .controller('DinninglistCtrl', function ($scope, $stateParams, DinningListService, $state) {
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.order = 'distance';
        $scope.city = $stateParams.city;
        var map = new BMap.Map("allmap");
        var point = new BMap.Point($stateParams.longitude, $stateParams.latitude);

        DinningListService.getRestaurants($stateParams.search)
            .success(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var restaurantPoint = new BMap.Point(data[i].longitude, data[i].latitude);
                    data[i].distance = map.getDistance(point, restaurantPoint);
                    data[i].address = data[i].city + data[i].address;

                }
                $scope.results = data;
                $scope.allResults = data;
            });


        $scope.dinningDetail = function (restaurantId) {
            $state.go('dinning', {id: restaurantId});
        };


        $scope.myCity = function (item) {
            $scope.results = $scope.allResults;
            var filteredData = new Array();
            for (var i = 0; i < $scope.results.length; i++) {
                if ($scope.results[i].city == item) {
                    filteredData.push($scope.results[i]);
                }
            }
            $scope.results = filteredData;
        };
        $scope.change = function (cname) {
            $scope.myCity(cname);
        };


        $scope.sortInfo = function (condition) {
            console.log(condition);
            $scope.order = condition;
        };

    });
