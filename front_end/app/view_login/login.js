/**
 * Created by Lijingjing on 15/11/18.
 */
'use strict';

angular.module('myApp.login', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
                templateUrl: 'view_login/login.html',
                controller: 'LoginCtrl'
            })
    }])
    //服务的工厂函数用来生成一个单例的对象或函数,这个对象或函数就是服务,存在于应用的整个生命周期内
    //服务的工厂函数既可以是一个函数也可以是一个数组
    .factory('LoginService', ['$http', function ($http) {
        var baseUrl = "";

        var confirmUserRequest = function (userinfo) {
            return $http({
                method: 'POST',
                url: baseUrl + '/users/login',
                data: $.param(userinfo),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        };

        return {
            confirmUser: function (userInfo) {
                return confirmUserRequest(userInfo);
            }
        }

    }])

    .controller('LoginCtrl', ['$scope', 'LoginService', function ($scope, LoginService) {
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

        $scope.login = function () {

            $scope.userInfo = {
                'phone': $scope.phone
            };//放在function外面不能得到newUserInfo相关内容,因为没有进行双向绑定
            //alert(JSON.stringify($scope.newUserInfo));
            console.log($scope.newUserInfo);
            LoginService.confirmUser($scope.newUserInfo)
                .success(function (data, status) {
                    alert("success");
                })

        }


    }])
    .controller('PayRegisterCtrl', ['$scope', 'RegisterService', function ($scope, RegisterService) {
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
                'username': $scope.name,
                'gender': $scope.gender,
                'phoneNumber': $scope.phone
            };//放在function外面不能得到newUserInfo相关内容,因为没有进行双向绑定
            alert(JSON.stringify($scope.newUserInfo));
            console.log($scope.newUserInfo);
            //RegisterService.newUser($scope.newUserInfo)
            //    .success(function (data, status) {
            //        alert("success");
            //    })

        }


    }]);
