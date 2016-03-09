angular.module('vamotors.header', [])
	.controller('HeaderCtrl', function($scope, AuthService, ShoppingCart) {
		var init = function() {
			$('.user-dropdown').dropdown();
		};

		var deferInit = function() {
			_.defer(function() {
				init();
			});
		};

		$scope.init = init;

		$scope.authenticated = AuthService.isLoggedIn();
		$scope.admin = AuthService.isAdmin();

		$scope.$watch( AuthService.isLoggedIn, function ( isLoggedIn ) {
		   	$scope.authenticated = isLoggedIn;
		});

		$scope.$watch( AuthService.user, function ( user ) {
		   	$scope.user = user;
		   	deferInit();
		});

		$scope.$watch( AuthService.isAdmin, function ( isAdmin ) {
		   	$scope.admin = isAdmin;
		});


		$scope.$watch( ShoppingCart.getProductsCount, function(count) {
			$scope.productsCount = count;
		});

		$scope.signout = function() {
			AuthService.logout();
		};

		$('.button-collapse').sideNav({
	      	menuWidth: 300, // Default is 240
	      	edge: 'left', // Choose the horizontal origin
	      	closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
	    });
	    deferInit();
	})
	.directive('vaHeader', function() {
		return {
			restrict: 'E',
			controller: 'HeaderCtrl',
			templateUrl: 'directives/header/header.html'
		}
	});