/**
 * Created by Lijingjing on 15/11/12.
 */
'use strict';


angular.module('myApp.about', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'ngCookies'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('about', {
            url: '/about',
            templateUrl: 'view_about/about.html',
            controller: 'AboutCtrl'
        });
    }])
    .controller('ModalCtrl', function ($scope, $uibModalInstance, items, title) {
        $scope.items = items;
        $scope.title = title;
        $scope.ok = function () {
            $uibModalInstance.dismiss('确定');
        };
    })
    .controller('AboutCtrl', function ($scope, $location, $uibModal, $cookieStore, $state) {

        if ($cookieStore.get('login')) {
            $state.go('myinfo', {phone: $cookieStore.get('phone')});
        }

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


        $scope.bePayMem = function () {
            $location.path("/pay_register");
        };

        $scope.beFreeMem = function () {
            $location.path("/experience_register");
        };

        $scope.login = function () {
            $location.path("/login");
        };

        $scope.detail1 = function () {
            $scope.items = ['尊享会员在最美食全国范围内的合作商户消费享三免一优惠。', '三免一优惠指：三人同时在同一餐厅消费，可获其中一人免单。'];
            $scope.title = "全国三免一折扣";
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

        $scope.detail2 = function () {
            $scope.items = ['尊享会员在最美食全国范围内的合作商户消费，可享受代客泊车、免费停车、预留专有餐位、VIP通道等服务。具体见商户详情。'];
            $scope.title = "尊享VIP待遇";
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

        $scope.detail3 = function () {
            $scope.items = ['作为国内首家双语专业美食媒体，7年来，最美食从数百家星级酒店中甄选优秀餐厅作为推荐商户。', '最美食根据会员的消费偏好和交通情况智能推荐适合每位会员的餐厅，一键完成预定。'];
            $scope.title = "智能推荐一键订";
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
