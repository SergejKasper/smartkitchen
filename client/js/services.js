'use strict';
//retrieve the recepies
angular.module('RecepiesApp.restServices', ['ngResource'])
	.factory('Recepie', ['$resource',
		function($resource) {
			return $resource('http://localhost:port/recepies/:recepieId', {
				port: ':4000', recepieId: '@_id' },{
		        remove: {method: 'DELETE'},
		        update:   {method: 'PUT'},
		        save:    {method: 'POST'}
			});
		}
	]);


angular.module('RecepiesApp.cordovaServices', [])

// phonegap ready service - listens to deviceready
.factory('phonegapReady', function() {
	return function(fn) {
		var queue = [];
		var impl = function() {
			queue.push(Array.prototype.slice.call(arguments));
		};

		document.addEventListener('deviceready', function() {
			queue.forEach(function(args) {
				fn.apply(this, args);
			});
			impl = fn;
		}, false);

		return function() {
			return impl.apply(this, arguments);
		};
	};
});
