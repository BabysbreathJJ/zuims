/**
 * Created by Lijingjing on 15/11/27.
 */

'use strict';


angular.module('myApp.userinfo', ['ngAnimate', 'ui.router'])
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

        // we will store all of our form data in this object
        $scope.formData = {};

        // function to process the form
        $scope.processForm = function () {
            alert('awesome!');
        };




        $scope.today = function() {
            $scope.birth = new Date();
        };
        $scope.today();



        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
        $scope.maxDate = new Date(2020, 5, 22);

        $scope.open = function($event) {
            $scope.status.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.status = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events =
            [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i=0;i<$scope.events.length;i++){
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };


    });
