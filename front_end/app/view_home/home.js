/**
 * Created by Lijingjing on 15/11/20.
 */
'use strict';


angular.module('myApp.home', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'myApp.constants'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'view_home/home.html',
            controller: 'HomeCtrl'
        });
    }])
    .filter('price', function () {
        return function (input) {

            return input + " 人/元";
        }
    })
    .factory('RecommandService', ['$http', 'restaurantBaseUrl', function ($http, restaurantBaseUrl) {
        //var baseUrl = "http://202.120.40.175:21100";

        var getRecommandRequest = function (cname) {
            return $http({
                method: 'GET',
                url: restaurantBaseUrl + '/restaurants/recommand/city?cname=' + cname,
                crossDomain: true
            });
        };

        return {
            getRecommand: function (cname) {
                return getRecommandRequest(cname);
            }
        }

    }])
    .controller('HomeCtrl', function ($scope, $location, RecommandService, $state) {
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.cname = "北京";
        var slides = $scope.slides = [];

        if (navigator.geolocation) {
            console.log("浏览器支持!");
        }
        else {
            console.log("浏览器不支持!");
        }

        $scope.reserve = function (data) {
            //alert(data);
        };

        $scope.search = function () {
            //$location.path('/dinninglist?search=test');
            $state.go('dinninglist', {search: $scope.keyword, city: $scope.cname});
        };


        function getLocation() {
            var options = {
                enableHighAccuracy: true,
                maximumAge: 1000
            }
            if (navigator.geolocation) {
                //浏览器支持geolocation
                navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

            } else {
                //浏览器不支持geolocation
                $scope.cname = "北京";
                RecommandService.getRecommand(cname)
                    .success(function (data, status) {
                        $scope.slides = data;
                    });

            }

        }

        function onSuccess(position) {
            //返回用户位置
            //经度
            var longitude = position.coords.longitude;
            //纬度
            var latitude = position.coords.latitude;
            //alert('经度' + longitude + '，纬度' + latitude);

            //根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(longitude, latitude);
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function (rs) {
                var addComp = rs.addressComponents;
                //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                $scope.cname = addComp.city;
                $scope.cname = $scope.cname.substring(0, $scope.cname.length - 1);
                RecommandService.getRecommand($scope.cname)
                    .success(function (data, status) {
                        $scope.slides = data;
                    });
            });
        }

        //失败时
        function onError(error) {
            switch (error.code) {
                case 1:
                    alert("位置服务被拒绝");
                    break;
                case 2:
                    alert("暂时获取不到位置信息");
                    break;
                case 3:
                    alert("获取信息超时");
                    break;
                case 4:
                    alert("未知错误");
                    break;
            }
        }

        getLocation();

        $scope.change = function (cname) {
            RecommandService.getRecommand(cname)
                .success(function (data, status) {
                    $scope.slides = data;
                    //console.log($scope.slides);
                });
        };


        $scope.dinningDetail = function (restaurantId) {
            $state.go('dinning', {id: restaurantId});
        };
    });