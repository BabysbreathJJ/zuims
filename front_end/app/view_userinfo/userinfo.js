/**
 * Created by Lijingjing on 15/11/27.
 */
'use strict';

angular.module('myApp.userinfo', ['ngAnimate', 'ui.router','kendo.directives'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
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
                templateUrl: 'view_userinfo/userinfo-initial.html'
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
    .controller('FormCtrl', function ($scope) {
        kendo.culture("zh-CN");

        // we will store all of our form data in this object
        $scope.formData = {};

        // function to process the form
        $scope.processForm = function () {
            alert('awesome!');
        };

<<<<<<< HEAD
<<<<<<< HEAD
=======




>>>>>>> ff724717408678ba1723a192d16d92c781d90b26
=======
>>>>>>> 2a0f553375518588bd21b281467767962644662f
    });
