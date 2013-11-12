'use strict';

angular.module('RecepiesApp.restServices', ['ngResource'])
	.factory('Recepie', ['$resource',
		function($resource) {
			return $resource('http://192.168.43.108:port/recepies/:recepieId', {port:':4000'});
		}
	]);