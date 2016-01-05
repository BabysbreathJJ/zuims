/**
 * Created by Lijingjing on 15/11/27.
 */
'use strict';

angular.module('myApp.userinfo', ['ngAnimate', 'ui.router', 'kendo.directives', 'myApp.constants', 'ngImgCrop'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('uploadPic', {
                url: '/uploadPic',
                templateUrl: 'view_userinfo/uploadPic.html',
                controller: 'ImageCtrl'
            })
            // route to show our basic form (/form)
            .state('userinfo', {
                url: '/userinfo',
                templateUrl: 'view_userinfo/userinfo.html',
                controller: 'FormCtrl'
            })
            // nested states
            // each of these sections will have their own view
            // url will be nested (/form/initial)
            .state('userinfo.initial', {
                url: '/initial',
                templateUrl: 'view_userinfo/userinfo-initial.html',
            })

            // url will be /form/basic
            .state('userinfo.basic', {
                url: '/basic',
                templateUrl: 'view_userinfo/userinfo-basic.html'
            })

            // url will be /form/contact
            .state('userinfo.contact', {
                url: '/contact',
                templateUrl: 'view_userinfo/userinfo-contact.html'
            })

            .state('userinfo.occupation', {
                url: '/occupation',
                templateUrl: 'view_userinfo/userinfo-occupation.html'
            })

            // url will be /form/payment
            .state('userinfo.interests', {
                url: '/interests',
                templateUrl: 'view_userinfo/userinfo-interests.html'
            });

        // catch all route
        // send users to the form page
        $urlRouterProvider.otherwise('/userinfo/initial');

    }])
    .factory('UserInfoService', ['$http', 'userBaseUrl', function ($http, userBaseUrl) {
        //var baseUrl = "http://202.120.40.175:21102";

        var getUserInfolRequest = function (phone) {
            return $http({
                method: 'GET',
                url: userBaseUrl + '/users/userInfo?phone=' + phone,
                crossDomain: true
            });
        };

        var saveuserInfoRequest = function (phone, formData) {
            console.log(formData);
            return $http({
                method: "POST",
                url: userBaseUrl + '/users/userinfocomplete?phone=' + phone,
                data: JSON.stringify(formData),
                headers: {'Content-Type': 'application/json'},
                crossDomain: true
            });
        };

        return {
            getUserInfo: function (phone) {
                return getUserInfolRequest(phone);
            },
            saveUserInfo: function (phone, formData) {
                return saveuserInfoRequest(phone, formData);
            }
        }

    }])
    .controller('FormCtrl', function ($scope, $state, UserInfoService, $cookieStore, $filter) {
        kendo.culture("zh-CN");

        // we will store all of our form data in this object
        UserInfoService.getUserInfo($cookieStore.get('phone'))
            .success(function (data) {
                if (data.gender == 0)
                    data.gender = "女";
                else data.gender = "男";
                //console.log(data.name);
                if (data.name == "" || data.name == null)
                    data.name = data.lastname;
                $scope.formData = data;
            });
        //$scope.formData = {};

        $scope.myAvatar = './images/panda.jpg';

        // function to process the form
        $scope.processForm = function () {
            alert('awesome!');
        };

        $scope.basicSwipOver = function (link) {
            $state.go(link);
        };

        $scope.uploadPic = function () {
            $state.go('uploadPic');
        };

        $scope.saveInfo = function () {
            if ($scope.formData.gender == "男")
                $scope.formData.gender = 1;
            else $scope.formData.gender = 0;
            delete $scope.formData.loyaltyPoints;
            console.log($scope.formData);
            UserInfoService.saveUserInfo($cookieStore.get('phone'), $scope.formData)
                .success(function (data) {
                   alert("信息保存成功!");
                });
        }

    })
    .controller('ImageCtrl', function ($scope) {


        $scope.myImage = '';
        $scope.myCroppedImage = '';

        var handleFileSelect = function (evt) {

            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);

        };
        angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);


    });
