/*global angular */

angular.module("youtube-thumbnail-preview", ["ngFilemodel"])

.controller("main", ["$scope", function ($scope) {

    /** Stores info about the fake video that is displayed. */
    $scope.info = {
        title: "Title of the video",
        uploader: "Channel Name",
        time: "12:34",
        uploadtime: "42 minutes ago",
        views: "123,456",
    };

    /** FileList model for the thumbnail selection */
    $scope.imageFiles = null;
    /** The currently displayed data URL */
    $scope.image = null;

    /**
     * Reads the given File object as a data URL and stores it in $scope.image.
     */
    function loadFile(file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            $scope.$apply(function () {
                $scope.image = event.target.result;
            });
        };
        reader.readAsDataURL(file);
    }

    // load thumbnail on file selection
    $scope.$watchCollection("imageFiles", function (files) {
        if (files && files.length) {
            loadFile(files[0]);
        }
    });

}])

.directive("appThumbnail", [function () {
    return {
        restrict: "E",
        scope: true,
        templateUrl: "app/thumbnail.html",
    };
}]);
