/**
 * Created by Lijingjing on 15/11/20.
 */
'use strict';


angular.module('myApp.home', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'myApp.constants', 'ngTouch'])
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
    .filter('restaurantsInfos', function () {
        return function (data, myPoint) {
            for (var i = 0; i < data.length; i++) {
                var restaurantPoint = new BMap.Point(data.longitude, data.latitude);
                data.distance = map.getDistance(myPoint, restaurantPoint);
                data.address = addComp.city + data.address;
            }
            return data;
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
    .controller('HomeCtrl', function ($scope, $location, RecommandService, $state, $filter) {
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.cname = "";
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
            //alert(point);
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function (rs) {
                var addComp = rs.addressComponents;
                //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                $scope.cname = addComp.city;
                $scope.cname = $scope.cname.substring(0, $scope.cname.length - 1);
                //var pointA = new BMap.Point(106.486654, 29.490295);  // 创建点坐标A--大渡口区
                //var pointB = new BMap.Point(106.581515, 29.615467);  // 创建点坐标B--江北区
                //alert('从大渡口区到江北区的距离是：' + map.getDistance(pointA, pointB) + ' 米。');
                RecommandService.getRecommand($scope.cname)
                    .success(function (data, status) {
                        $scope.slides = data;
                        //$scope.slides = function(){
                        //    return $filter('lowercase')($scope.name);
                        //};
                        //
                        //
                        //$scope.slides = $filter('restaurantsInfos')(data, point);
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

            $scope.cname = "定位失败";
        }

        getLocation();

        //$scope.change = function (cname) {
        //    RecommandService.getRecommand(cname)
        //        .success(function (data, status) {
        //            $scope.slides = data;
        //            //for (var len = 0; len < data.length; len++)
        //            $scope.slides[0].active = true;
        //        });
        //};


        $scope.dinningDetail = function (restaurantId) {
            $state.go('dinning', {id: restaurantId});
        };
    });