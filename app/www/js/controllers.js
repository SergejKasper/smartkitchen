'use strict';

angular.module('RecepiesApp.controllers', [])

.controller('RecepiesListCtrl', ['$scope', 'Recepie',
    function($scope, Recepie) {
        $scope.recepies = Recepie.query();
    }
])

.controller('RecepiesDetailCtrl', ['$scope', '$routeParams', 'Recepie', '$history',
    function($scope, $routeParams, Recepie, $location) {
        $scope.recepie = Recepie.get({
            'recepieId': $routeParams.recepieId
        });

        $scope.takePicture = function() {
            var options =   {
                quality: 10,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                encodingType: 0     // 0=JPG 1=PNG
            };
            // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(onSuccess,onFail,options);
            //onSuccess("iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2OcdvjOGQYIOAvExoxQARAHDEACM6FsY2wCZwE3dg6jAuodfwAAAABJRU5ErkJggg==");
        };
        var onSuccess = function(imageData) {
            //console.log("On Success! ");
            $scope.recepie.picture = "data:image/jpeg;base64," + imageData;
            $scope.recepie.$update(function (resp) {
                
              });
            $scope.safeApply();
        };
        var onFail = function(e) {
            //console.log("On fail " + e);
            $scope.error = "Taking the picture caused an error." + e;
        };
    }
]);

        /*$scope.updateRecepie = function(recepie) {
            recepie.$update(backToList);
        };
        $scope.addRecepie = function() {
            recepie.save($scope.newRecepieModel, backToList);
        };

        $scope.updateRecepie = function(recepie) {
            recepie.$update(backToList);
        };

        $scope.deleteRecepie = function(recepie) {
            recepie.$delete(function() {
                backToList();
            });
        };*/