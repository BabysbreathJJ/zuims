/**
 * Created by Lijingjing on 15/12/1.
 */
'use strict';

angular.module('myApp.dinning', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'myApp.constants'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('dinning', {
            url: '/dinning?id&distance&longitude&latitude',
            templateUrl: 'view_dinning/dinning.html',
            controller: 'DinningCtrl'
        });
    }])
    //服务的工厂函数用来生成一个单例的对象或函数,这个对象或函数就是服务,存在于应用的整个生命周期内
    //服务的工厂函数既可以是一个函数也可以是一个数组
    .factory('DinningService', ['$http', 'restaurantBaseUrl', function ($http, restaurantBaseUrl) {
        //var baseUrl = "http://202.120.40.175:21102";

        var getDinningDetailRequest = function (id) {
            return $http({
                method: 'GET',
                url: restaurantBaseUrl + '/restaurants/info?id=' + id,
                crossDomain: true
            });
        };

        return {
            getRestaurantsInfo: function (id) {
                return getDinningDetailRequest(id);
            }
        }

    }])
    .controller('ModalCtrl', function ($scope, $uibModalInstance) {
        $scope.ok = function () {
            $uibModalInstance.dismiss('确定');
        };
    })
    .controller('DinningCtrl', ['$scope', 'DinningService', '$stateParams', '$uibModal', function ($scope, DinningService, $stateParams, $uibModal) {

        $scope.gender = null;
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;


        DinningService.getRestaurantsInfo($stateParams.id)
            .success(function (data) {
                $scope.dinning = data;
                $scope.dinning.distance = $stateParams.distance;
            });

        $scope.showMap = function () {
            //var longitude = $stateParams.longitude;
            //var latitude = $stateParams.latitude;
            //var map = new BMap.Map("myMap");    // 创建Map实例
            //var point = new BMap.Point(longitude, latitude);    // 创建点坐标
            //map.centerAndZoom(point, 15);
            //var marker = new BMap.Marker(new BMap.Point(longitude, latitude));  // 创建标注
            //map.addOverlay(marker);              // 将标注添加到地图中


            //$scope.animationsEnabled = true;
            //var modalInstance = $uibModal.open({
            //    animation: $scope.animationsEnabled,
            //    templateUrl: 'myModalContent.html',
            //    controller: 'ModalCtrl',
            //    size: 'sm'
            //});


            var map = new BMap.Map("myMap");    // 创建Map实例
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
            map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
            map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        };

    }]);