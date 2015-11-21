/**
 * Created by Lijingjing on 15/11/20.
 */
'use strict';


angular.module('myApp.home', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'view_home/home.html',
            controller: 'HomeCtrl'
        });
    }])
    .controller('HomeCtrl', function ($scope, $location) {
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        var slides = $scope.slides = [];
        //$scope.addSlide = function (i) {
        //    var newWidth = 600 + slides.length + 1;
        //    slides.push({
        //        image: 'images/' + i + '.jpg',
        //        text: ['全国三免一折扣', '尊享VIP待遇', '智能推荐一键订'][slides.length % 3]
        //    });
        //};
        //for (var i = 1; i < 4; i++) {
        //    $scope.addSlide(i);
        //}
        slides.push({
            image: 'images/Eles.jpg',
            title: 'Efes Turkish & Mediterranean Cuisine',
            price: '195元/人',
            address: '中国上海市浦东新区商城路665号1885文化广场B座一层'
        });
        slides.push({
            image: 'images/GoodFellas.jpg',
            title: 'Goodfellas',
            price: '263元/人',
            address: '黄浦区 延安东路7号(中山东二路外滩)'
        });
        slides.push({
            image: 'images/Hakkasan.jpg',
            title: 'Hakkasan',
            price: '593元/人',
            address: '黄浦区 中山东一路18号外滩18号5层(近南京东路, 地铁2&10'
        });
        slides.push({
            image: 'images/VANCA\'S.jpg',
            title: 'VANCA\'S凡客极品',
            price: '137元/人',
            address: '静安区 大沽路427号(近成都北路)'
        });


        $scope.reserve = function(data){
            alert(data);
        }


    });