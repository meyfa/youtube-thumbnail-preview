/*global angular */

var app = angular.module("youtube-thumbnail-preview", []);



app.controller("main", ["$scope", function ($scope) {

    $scope.imageFiles = null;
    $scope.image = null;

    $scope.info = {
        title: "Title of the video",
        uploader: "Channel Name",
        time: "12:34",
        uploadtime: "42 minutes ago",
        views: "123,456"
    };

    $scope.$watch("imageFiles", function (files) {

        if (!files || !files.length)
            return;

        var file = files[0];

        var reader = new FileReader();
        reader.onload = function (event) {
            $scope.$apply(function () {
                $scope.image = event.target.result;
            });
        };
        reader.readAsDataURL(file);

        $scope.imageFiles = null;

    });

}]);



app.directive("fileModel", [function () {
    return {

        restrict: "A",
        require: "ngModel",

        link: function (scope, element, attrs, ctrl) {

            // file select -> model
            element.bind("change", function (event) {
                ctrl.$setViewValue(event.target.files);
            });

            // model -> file select
            ctrl.$render = function () {
                if (!ctrl.$viewValue) {
                    element.val(null);
                }
            };

        }

    };
}]);



app.directive("appThumbnail", [function () {
    return {

        restrict: "E",
        scope: true,

        templateUrl: "app/thumbnail.html"

    };
}]);
