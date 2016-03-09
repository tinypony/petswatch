
angular.module('vamotors.landing',['ngRoute']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'landing/landing.html',
        controller: 'LandingCtrl'
    });
}]).controller('LandingCtrl', ['$scope', function($scope) {
	$scope.init = function() {
		$('.slider').slider({full_width: true});
	};

	$scope.init();
}]);

