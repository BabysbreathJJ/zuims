'use strict';

angular.module('myApp.register', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'view_register/register.html',
            controller: 'RegisterCtrl'
        });
    }])
    //服务的工厂函数用来生成一个单例的对象或函数,这个对象或函数就是服务,存在于应用的整个生命周期内
    //服务的工厂函数既可以是一个函数也可以是一个数组
    .factory('RegisterService', ['$http', function ($http) {
        var baseUrl = "";

        var newUserRequest = function (newUser) {
            return $http({
                method: 'POST',
                url: baseUrl + '/users',
                data: $.param(newuser),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        };

        return {
            newUser: function (newUser) {
                return newUserRequest(newUser);
            }
        }

    }])

    .controller('RegisterCtrl', ['$scope', 'RegisterService', function ($scope, RegisterService) {

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
