/**
 * Created by Lijingjing on 15/11/18.
 */
'use strict';

angular.module('myApp.login', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'ngCookies', 'myApp.constants'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'view_login/login.html',
            controller: 'LoginCtrl'
        });
    }])
    //服务的工厂函数用来生成一个单例的对象或函数,这个对象或函数就是服务,存在于应用的整个生命周期内
    //服务的工厂函数既可以是一个函数也可以是一个数组
    .factory('LoginService', ['$http', 'userBaseUrl', function ($http, userBaseUrl) {
        //var baseUrl = "http://202.120.40.175:21101";

        var confirmUserRequest = function (userinfo) {
            return $http({
                method: 'POST',
                url: userBaseUrl + '/users/login',
                data: JSON.stringify(userinfo),
                headers: {'Content-Type': 'application/json'},
                crossDomain: true
            });
        };

        return {
            confirmUser: function (userInfo) {
                return confirmUserRequest(userInfo);
            }
        }

    }])

    .controller('LoginCtrl', ['$scope', 'LoginService', '$state', '$cookieStore', function ($scope, LoginService, $state, $cookieStore) {
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
                'phone': $scope.phone,
                'password': $scope.password
            };//放在function外面不能得到newUserInfo相关内容,因为没有进行双向绑定
            //alert(JSON.stringify($scope.newUserInfo));
            console.log($scope.userInfo);
            LoginService.confirmUser($scope.userInfo)
                .success(function (data, status) {
                    //alert("success");
                    //$locaiton.path("/myinfo");
                    $cookieStore.put('login', 'true');
                    $cookieStore.put('phone', $scope.phone);
                    //$state.go('myinfo', {phone: $scope.phone});
                    $state.go('home');
                })

        }


    }]);
