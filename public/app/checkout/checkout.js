 angular.module('vamotors.cartpage', ['ngRoute', 'vamotors.shoppingcart'])

	.config(['$routeProvider', function($routeProvider) { 
		$routeProvider.when('/checkout', {
	        templateUrl: 'checkout/checkout.html',
	        controller: 'CartCheckoutCtrl'
	    });
	}])

	.controller('CartCheckoutCtrl', ['$scope', 'ShoppingCart', function($scope, ShoppingCart) {

		$scope.order = {
			delivery: {},
			payment: {
				card: {}
			},
			products: ShoppingCart.getProducts()
		};
		
		$scope.$watch(ShoppingCart.getProductsCount, function(productsCount) {
			$scope.order.products = ShoppingCart.getProducts();
		});


		$scope.getSubtotal = function() {
			return _.reduce($scope.order.products, function(memo, product) {
				return memo + product.count * product.product.attributes.price;
			}, 0);
		};

		$scope.checkout = function() {
			console.log($scope.order);
		}
	}]);