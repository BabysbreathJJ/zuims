'use strict';

angular.module('myApp.register', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'myApp.constants'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('experience_register', {
                url: '/experience_register',
                templateUrl: 'view_register/experience_register.html',
                controller: 'ExperienceRegisterCtrl'
            })
            .state('pay_register', {
                url: '/pay_register',
                templateUrl: 'view_register/pay_register.html',
                controller: 'PayRegisterCtrl'
            });
    }])
    //服务的工厂函数用来生成一个单例的对象或函数,这个对象或函数就是服务,存在于应用的整个生命周期内
    //服务的工厂函数既可以是一个函数也可以是一个数组
    .factory('RegisterService', ['$http', 'userBaseUrl', function ($http, userBaseUrl) {
        //var baseUrl = "http://202.120.40.175:21101";

        var newUserRequest = function (newUser) {
            return $http({
                method: 'POST',
                url: userBaseUrl + '/users/register',
                data: JSON.stringify(newUser),
                headers: {'Content-Type': 'application/json'},
                crossDomain: true
            });
        };

        return {
            newUser: function (newUser) {
                return newUserRequest(newUser);
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
    .controller('PayRegisterCtrl', ['$scope', 'RegisterService', '$uibModal', function ($scope, RegisterService, $uibModal) {

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

        $scope.newUser = function () {

            $scope.newUserInfo = {
                'lastname': $scope.name,
                'gender': $scope.gender,
                'phone': $scope.phone,
                'password': $scope.password
            };//放在function外面不能得到newUserInfo相关内容,因为没有进行双向绑定
            console.log(JSON.stringify($scope.newUserInfo));
            console.log($scope.newUserInfo);
            RegisterService.newUser($scope.newUserInfo)
                .success(function (data, status) {
                    //alert("success");
                    console.log(data);
                });

        };


        $scope.showDescription = function () {
            $scope.items = ['会员为邀请制。会员年费：388元/年。',
                '会员等级包括黄金会员、铂金会员、钻石会员。',
                '尊享会员消费优惠不限次数。',
                '3免1优惠范围：可通过最美食预定的自助餐、下午茶、大堂吧、商务套餐、周末早午餐等。专享VIP待遇，会员积分等权益。',
                '铂金会员每年可邀请2位新会员免费获得黄金会员权益。',
                '钻石会员每年可邀请5位新会员免费获得黄金会员权益。',
                '最终解释权归最美食所有。'];
            $scope.title = "付费会员权益";
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

    }])
    .controller('ExperienceRegisterCtrl', ['$scope', 'RegisterService', '$uibModal', '$state', '$cookieStore', function ($scope, RegisterService, $uibModal, $state, $cookieStore) {
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

        $scope.newUser = function () {

            $scope.newUserInfo = {
                'lastname': $scope.name,
                'gender': $scope.gender,
                'phone': $scope.phone,
                'password': $scope.password
            };//放在function外面不能得到newUserInfo相关内容,因为没有进行双向绑定
            console.log(JSON.stringify($scope.newUserInfo));
            console.log($scope.newUserInfo);
            RegisterService.newUser($scope.newUserInfo)
                .success(function (data, status) {
                    if (data.success == true)
                    //alert("注册成功!");
                    //console.log(data);
                        $cookieStore.put('login', 'true');
                    $cookieStore.put('phone', $scope.phone);
                    //$state.go('myinfo', {phone: $scope.phone});
                    $state.go('home');
                });

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
    }]);
