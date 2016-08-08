/*global angular */

var app = angular.module("youtube-thumbnail-preview", ["ngFilemodel"]);



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

    $scope.$watchCollection("imageFiles", function (files) {

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

    });

}]);



app.directive("appThumbnail", [function () {
    return {

        restrict: "E",
        scope: true,

        templateUrl: "app/thumbnail.html"

    };
}]);
