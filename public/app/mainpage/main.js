
	function get_new_additions($scope) {
		
	}

	function get_most_wanted($scope) {
		$scope.mostWanted = [
			{
				manufacturer: 'CompanyX',
			    model: 'Tyre2000',
			    availability: 2000,
			    description: 'Super tyres for you comfort and grip like hell',
			    price: 110
			}, {
				manufacturer: 'CompanyY',
			    model: 'SpinSpin',
			    availability: 2000,
			    description: 'Super tyres for you comfort and grip like hell',
			    price: 110
			}, {
				manufacturer: 'CompanyZ',
			    model: 'MotoVzhhh',
			    availability: 2000,
			    description: 'Super tyres for you comfort and grip like hell',
			    price: 110
			}, {
				manufacturer: 'CompanyK',
			    model: 'Roll2000',
			    availability: 2000,
			    description: 'Super tyres for you comfort and grip like hell',
			    price: 110
			}
		];
	}

	angular.module('vamotors.main', ['ngRoute', 'vamotors.shoppingcart']).config(['$routeProvider', function($routeProvider) { 
		$routeProvider.when('/', {
	        templateUrl: 'mainpage/main.html',
	        controller: 'MainCtrl'
	    });
	}]).controller('MainCtrl', ['$scope', '$http', 'ShoppingCart', function($scope, $http, ShoppingCart) {

		$http.get('/product?filter=new').then(function(resp) {
			$scope.newAdditions = resp.data;
		}, function(resp) {
		});


		$http.get('/product?filter=mostwanted').then(function(resp) {
			$scope.mostWanted = resp.data;
		}, function(resp) {

		});

		$scope.addToCart = function(product) {
			ShoppingCart.add(product);
		};

		_.defer(function() {
			var descriptions = $('.product-details .product-description');
			descriptions.dotdotdot();
		});
	}]);
