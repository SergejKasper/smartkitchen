'use strict';

angular.module('RecepiesApp.controllers', [])

.controller('MainCtrl', function($scope) {
 
})

.controller('RecepiesListCtrl',
	['$scope', 'Recepie',
	function ($scope, Recepie) {
		$scope.recepies = Recepie.query();
	}])

.controller('RecepiesDetailCtrl', 
	['$scope', '$routeParams', 'Recepie',
	function ($scope, $routeParams, Recepie) {
		$scope.recepie = Recepie.get({recepieId: $routeParams.recepieId});
	}]);