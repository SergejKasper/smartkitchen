'use strict';


var app = angular.module('RecepiesApp',
	['jqm',
	'RecepiesApp.controllers', 
	'RecepiesApp.restServices']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/recepies', {templateUrl: 'partials/recepies-list.html', animation: 'page-slide', controller: 'RecepiesListCtrl'});
    $routeProvider.when('/recepies/:recepieId', {templateUrl: 'partials/recepies-details.html', animation: 'page-slide', controller: 'RecepiesDetailCtrl'});
    $routeProvider.otherwise({redirectTo: '/recepies'});
}]);