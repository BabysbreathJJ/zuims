/**
 * Created by Lijingjing on 15/12/1.
 */
'use strict';

angular.module('myApp.dinning', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'myApp.constants'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('dinning', {
            url: '/dinning?id',
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

    .controller('DinningCtrl', ['$scope', 'DinningService', '$stateParams', function ($scope, DinningService, $stateParams) {

        $scope.gender = null;
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        var slides = $scope.slides = [];
        $scope.addSlide = function (i) {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: 'images/' + i + '.jpg',
                text: ['全国三免一折扣', '尊享VIP待遇', '智能推荐一键订'][slides.length % 3]
            });
        };
        for (var i = 1; i < 4; i++) {
            $scope.addSlide(i);
        }

        DinningService.getRestaurantsInfo($stateParams.id)
            .success(function (data) {
                $scope.dinning = data;
            });

    }]);