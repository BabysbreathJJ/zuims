/**
 * Created by Lijingjing on 15/12/3.
 */
angular.module('myApp.image', ['ui.router','ngImgCrop'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('image', {
            url: '/image',
            templateUrl: 'view_image/image.html',
            controller: 'Ctrl'
        });
    }])

    .controller('Ctrl', function($scope) {
        $scope.myImage='';
        $scope.myCroppedImage='';

        var handleFileSelect=function(evt) {
            var file=evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function($scope){
                    $scope.myImage=evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
    });