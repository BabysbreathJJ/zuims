/**
 * Created by Lijingjing on 15/11/29.
 */
'use strict';

angular.module('myApp.myinfo', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'myApp.constants'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {

        $stateProvider
        // route to show our basic form (/form)
            .state('myinfo', {
                url: '/myinfo?phone',
                templateUrl: 'view_myinfo/myinfo.html',
                controller: 'MyinfoCtrl'
            });

    }])
    .factory('MyinfoService', ['$http', 'userBaseUrl', function ($http, userBaseUrl) {
        //var baseUrl = "http://202.120.40.175:21101";

        var getUserInfoRequest = function (phone) {
            return $http({
                method: 'GET',
                url: userBaseUrl + '/users?phone=' + phone,
                crossDomain: true
            });
        };

        return {
            getUserInfo: function (phone) {
                return getUserInfoRequest(phone);
            }
        }

    }])
    .controller('ModalCtrl', function ($scope, $uibModalInstance, items, title) {
        $scope.items = items;
        $scope.title = title;
        $scope.ok = function () {
            $uibModalInstance.dismiss('确定');
        };
    })
    .controller('MyinfoCtrl', function ($scope, $uibModal, $location, MyinfoService, $stateParams) {

        MyinfoService.getUserInfo($stateParams.phone)
            .success(function (data) {
                $scope.userinfo = data;
            });

        $scope.historyInfos = [{name: "喜来登", date: "2015-11-30"}, {name: "希尔顿", date: "2015-11-30"}];
        $scope.fillInfo = function () {
            $location.path('/userinfo/initial');
        };


        $scope.showDescription = function () {
            $scope.items = ['每人可免费试用最美食体验会员30个自然日。',
                '体验会员可享受最美食全国范围内的合作商户消费三免一优惠。限酒店自助餐。每月限优惠2单。',
                '最终解释权归最美食所有。'];
            $scope.title = "体验会员权益";
            $scope.animationsEnabled = true;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalCtrl',
                size: 'sm',
                resolve: {
                    items: function () {
                        return $scope.items;
                    },
                    title: function () {
                        return $scope.title;
                    }
                }
            });
        };

    });
