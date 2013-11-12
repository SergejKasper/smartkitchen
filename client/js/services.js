'use strict';

angular.module('RecepiesApp.restServices', ['ngResource'])
	.factory('Recepie', ['$resource',
		function($resource) {
			return $resource('http://localhost:port/recepies/:recepieId', {port:':4000'});
		}
	]);