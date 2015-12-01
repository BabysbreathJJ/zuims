/**
 * Created by Lijingjing on 15/11/20.
 */
'use strict';


angular.module('myApp.home', ['ui.router', 'ngAnimate', 'ui.bootstrap'])
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
    .factory('RecommandService', ['$http', function ($http) {
        var baseUrl = "http://202.120.40.175:21100/restaurants/recommand";

        var getRecommandRequest = function () {
            return $http({
                method: 'GET',
                url: baseUrl,
                crossDomain: true
            });
        };

        return {
            getRecommand: function () {
                return getRecommandRequest();
            }
        }

    }])
    .controller('HomeCtrl', function ($scope, $location, RecommandService,$state) {
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        var slides = $scope.slides = [];

        if (navigator.geolocation) {
            console.log("浏览器支持!");
        }
        else {
            console.log("浏览器不支持!");
        }

        $scope.reserve = function (data) {
            alert(data);
        };
        RecommandService.getRecommand()
            .success(function (data, status) {
                $scope.slides = data;
            });

        $scope.search = function () {
            //$location.path('/dinninglist?search=test');
            $state.go('dinninglist', { search: $scope.keyword });
        };


        //function getLocation() {
        //    var options = {
        //        enableHighAccuracy: true,
        //        maximumAge: 1000
        //    }
        //    if (navigator.geolocation) {
        //        //浏览器支持geolocation
        //        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        //
        //    } else {
        //        //浏览器不支持geolocation
        //        $scope.myLocation = "北京";
        //    }
        //}
        //
        //function onSuccess(position) {
        //    //返回用户位置
        //    //经度
        //    var longitude = position.coords.longitude;
        //    //纬度
        //    var latitude = position.coords.latitude;
        //    alert('经度' + longitude + '，纬度' + latitude);
        //
        //    //根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
        //    var map = new BMap.Map("allmap");
        //    var point = new BMap.Point(longitude, latitude);
        //    var gc = new BMap.Geocoder();
        //    gc.getLocation(point, function (rs) {
        //        var addComp = rs.addressComponents;
        //        alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        //    });
        //}
        //
        ////失败时
        //function onError(error){
        //    switch(error.code){
        //        case 1:
        //            alert("位置服务被拒绝");
        //            break;
        //        case 2:
        //            alert("暂时获取不到位置信息");
        //            break;
        //        case 3:
        //            alert("获取信息超时");
        //            break;
        //        case 4:
        //            alert("未知错误");
        //            break;
        //    }
        //}

        //getLocation();

    });