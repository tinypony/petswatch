angular.module('vamotors.cartpage', ['ngRoute', 'vamotors.shoppingcart'])

	.config(['$routeProvider', function($routeProvider) { 
		$routeProvider.when('/cart', {
	        templateUrl: 'shopping_cart/shopping-cart.html',
	        controller: 'ShoppingCartCtrl'
	    });
	}])

	.controller('ShoppingCartCtrl', ['$scope', '$location', 'ShoppingCart', function($scope, $loc, ShoppingCart) {

		$scope.order = {
			delivery: {},
			payment: {},
			products: ShoppingCart.getProducts()
		};
		
		$scope.$watch(ShoppingCart.getProductsCount, function(productsCount) {
			$scope.order.products = ShoppingCart.getProducts();
		});

		$scope.getProductsPrice = function() {
			return _.reduce($scope.order.products, function(memo, product) {
				return memo + product.count * product.product.attributes.price;
			}, 0);
		};

		$scope.getShippingPrice = function() {
			return 0;
		}


		$scope.getSubtotal = function() {
			return this.getProductsPrice() + this.getShippingPrice();
		};

		$scope.removeProduct = function(prod) {
			ShoppingCart.remove(prod);
		};

		$scope.saveAndCheckout = function() {
			console.log(ShoppingCart.getProducts());
			ShoppingCart.sync().then(function(){
				$loc.path('/checkout');
			}, function(resp) {
				console.err(resp);
			})
		};

		$('.subtotal-pushpin').pushpin({offset: 100, top: $('.shopping-cart').offset().top });
	}]);