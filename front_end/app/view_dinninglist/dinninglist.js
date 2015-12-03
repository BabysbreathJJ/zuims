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
        var gc = new BMap.Geocoder();


        DinningListService.getRestaurants($stateParams.search)
            .success(function (data) {
                $scope.results = new Array();
                var tempfunc = function (i) {

                    var restaurantPoint = new BMap.Point(data[i].longitude, data[i].latitude);
                    var addComp;
                    gc.getLocation(restaurantPoint, function (rs) {
                        console.log(i);
                        addComp = rs.addressComponents;
                        console.log(addComp.city);
                        data[i].address = addComp.city + data[i].address;
                        $scope.results[i] = data[i];
                        if (i < data.length - 1) {
                            tempfunc(i + 1);
                        } else {
                            //$scope.results = data;
                            $scope.$apply();
                        }
                    });
                    data[i].distance = map.getDistance(point, restaurantPoint);
                };
                tempfunc(0);

                console.log(data);

                //$scope.results = data;
            });

        //console.log($scope.city);
        var poit = $stateParams.point;
        console.log(point);

        $scope.dinningDetail = function (restaurantId) {
            $state.go('dinning', {id: restaurantId});
        };


        $scope.change = function (cname) {
            DinningListService.getRecommand(cname)
                .success(function (data) {
                    $scope.results = data;
                });
        };

        $scope.sortInfo = function (condition) {
            console.log(condition);
            $scope.order = condition;
        };

    });
