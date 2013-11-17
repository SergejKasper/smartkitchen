'use strict';

var app = angular.module('RecepiesApp', ['jqm',
	'RecepiesApp.controllers',
	'RecepiesApp.restServices',
	'RecepiesApp.cordovaServices'
]);
app.config(['$routeProvider',
	function($routeProvider) {

		$routeProvider.when('/recepies', {
			templateUrl: 'partials/recepies-list.html',
			animation: 'page-slide',
			back: true,
			controller: 'RecepiesListCtrl'
		});

		$routeProvider.when('/recepies/:recepieId', {
			templateUrl: 'partials/recepies-details.html',
			animation: 'page-slide',
			controller: 'RecepiesDetailCtrl'
		});

		$routeProvider.otherwise({
			redirectTo: '/recepies'
		});
	}
])
.config([
  '$provide', function($provide) {
    return $provide.decorator('$rootScope', [
      '$delegate', function($delegate) {
        $delegate.safeApply = function(fn) {
          var phase = $delegate.$$phase;
          if (phase === "$apply" || phase === "$digest") {
            if (fn && typeof fn === 'function') {
              fn();
            }
          } else {
            $delegate.$apply(fn);
          }
        };
        return $delegate;
      }
    ]);
  }
]);