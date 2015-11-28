/**
 * Created by Lijingjing on 15/11/28.
 */

'use strict';

angular.module('myApp.dinninglist', ['ngAnimate', 'ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
        // route to show our basic form (/form)
            .state('dinninglist', {
                url: '/dinninglist',
                templateUrl: 'view_dinninglist/dinninglist.html',
                controller: 'DinninglistCtrl'
            });

    }])
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


    });
