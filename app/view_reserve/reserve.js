/**
 * Created by Lijingjing on 15/12/7.
 */

'use strict';

angular.module('myApp.reserve', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'myApp.constants','kendo.directives'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('reserve', {
            url: '/reserve',
            templateUrl: 'view_reserve/reserve.html',
            controller: 'ReserveCtrl'
        });
    }])
    //服务的工厂函数用来生成一个单例的对象或函数,这个对象或函数就是服务,存在于应用的整个生命周期内
    //服务的工厂函数既可以是一个函数也可以是一个数组
    .factory('ReserveService', ['$http', 'restaurantBaseUrl', function ($http, restaurantBaseUrl) {
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
    .controller('ReserveCtrl', ['$scope', 'DinningService', '$stateParams', '$uibModal', function ($scope, DinningService, $stateParams, $uibModal) {

       $scope.peopleNum = 3;
        $scope.noWrapSlides = false;


        DinningService.getRestaurantsInfo($stateParams.id)
            .success(function (data) {
                $scope.dinning = data;
            });

        $scope.reserve = function () {

        };

    }]);
