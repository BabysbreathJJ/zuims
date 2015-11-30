/**
 * Created by Lijingjing on 15/11/28.
 */

'use strict';

angular.module('myApp.dinninglist', ['ngAnimate', 'ui.router'])
<<<<<<< HEAD
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {

        $stateProvider
        //.state('dinninglist',{
        //    url: '/dinninglist/:search-word',
        //    templateUrl: 'view_dinninglist/dinninglist.html',
        //    controller: 'DinninglistCtrl'
        //});
        // route to show our basic form (/form)
            .state('dinninglist', {
                url: '/dinninglist?search',
=======
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
        // route to show our basic form (/form)
            .state('dinninglist', {
                url: '/dinninglist',
>>>>>>> ff724717408678ba1723a192d16d92c781d90b26
                templateUrl: 'view_dinninglist/dinninglist.html',
                controller: 'DinninglistCtrl'
            });

    }])
<<<<<<< HEAD
    .filter('price', function () {
        return function (input) {

            return input + " 人/元";
        }
    })
    .factory('DinningListService', ['$http', function ($http) {
        var baseUrl = "http://202.120.40.175:21100";

        var getRestaurantsRequest = function (keyword) {
            return $http({
                method: 'GET',
                url: baseUrl + '/restaurants/search?text=' + keyword,
                crossDomain: true
            });
        };

        return {
            getRestaurants: function (keyword) {
                return getRestaurantsRequest(keyword);
            }
        }

    }])
    .controller('DinninglistCtrl', function ($scope, $stateParams, DinningListService) {
        console.log($stateParams.search);

        DinningListService.getRestaurants($stateParams.search)
            .success(function(data){
                $scope.results = data;
            });
        //var results = $scope.results = [];
        //results.push({
        //    image: 'images/Eles.jpg',
        //    title: 'Efes Turkish & Mediterranean Cuisine',
        //    price: '195元/人',
        //    address: '中国上海市浦东新区商城路665号1885文化广场B座一层'
        //});
        //results.push({
        //    image: 'images/GoodFellas.jpg',
        //    title: 'Goodfellas',
        //    price: '263元/人',
        //    address: '黄浦区 延安东路7号(中山东二路外滩)'
        //});
        //results.push({
        //    image: 'images/Hakkasan.jpg',
        //    title: 'Hakkasan',
        //    price: '593元/人',
        //    address: '黄浦区 中山东一路18号外滩18号5层(近南京东路, 地铁2&10'
        //});
        //results.push({
        //    image: 'images/VANCA\'S.jpg',
        //    title: 'VANCA\'S凡客极品',
        //    price: '137元/人',
        //    address: '静安区 大沽路427号(近成都北路)'
        //});
=======
    .controller('DinninglistCtrl', function ($scope) {
        var results = $scope.results = [];
        results.push({
            image: 'images/Eles.jpg',
            title: 'Efes Turkish & Mediterranean Cuisine',
            price: '195元/人',
            address: '中国上海市浦东新区商城路665号1885文化广场B座一层'
        });
        results.push({
            image: 'images/GoodFellas.jpg',
            title: 'Goodfellas',
            price: '263元/人',
            address: '黄浦区 延安东路7号(中山东二路外滩)'
        });
        results.push({
            image: 'images/Hakkasan.jpg',
            title: 'Hakkasan',
            price: '593元/人',
            address: '黄浦区 中山东一路18号外滩18号5层(近南京东路, 地铁2&10'
        });
        results.push({
            image: 'images/VANCA\'S.jpg',
            title: 'VANCA\'S凡客极品',
            price: '137元/人',
            address: '静安区 大沽路427号(近成都北路)'
        });
>>>>>>> ff724717408678ba1723a192d16d92c781d90b26


    });
