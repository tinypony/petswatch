	angular.module('vamotors.signup', ['ngRoute']).config(['$routeProvider', function($routeProvider) { 
		$routeProvider.when('/signup', {
	        templateUrl: 'signup/signup.html',
	        controller: 'SignupCtrl'
	    });
	}]).controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $loc) {
		$scope.signupData = {
			email: '',
			password: '',
			repeat: ''
		};

		$scope.signup = function() {
			if(this.signupData.repeat === this.signupData.password) {
				//console.log(this.signupData);
				$http.post('/signup', this.signupData)
					.success(function(data, status, headers, config) {
						$loc.path('/');
					});
			}
		};

	}]);