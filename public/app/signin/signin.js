	angular.module('vamotors.signin', ['ngRoute']).config(['$routeProvider', function($routeProvider) { 
		$routeProvider.when('/signin', {
	        templateUrl: 'signin/signin.html',
	        controller: 'SigninCtrl'
	    });
	}]).controller('SigninCtrl', ['$scope', '$http', '$location', 'va.error', 'AuthService', function($scope, $http, $loc, Error, AuthService) {
		$scope.loginInfo = {
			email: '',
			password: ''
		};
		
		$scope.$watch( AuthService.isLoggedIn, function ( isLoggedIn ) {
		   	if(isLoggedIn) {
		   		$loc.path('/');
		   	}
		});


		$scope.doLogin = function() { 
			AuthService.login(this.loginInfo);
		};
	}]);