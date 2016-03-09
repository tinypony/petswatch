angular.module('vamotors.shoppingcart', ['vamotors.config', 'vamotors.usermanagement'])
	.factory('ShoppingCart', ['$http', 'va.error', 'AuthService', function($http, Error, AuthService) {
		var ShoppingCart;

		function setShoppingCart(resp) {
			ShoppingCart = resp.data;
		}

		function syncCart(shoppingCart) {
			return $http.put('/cart', {cart: ShoppingCart});
		}

		return {
			fetch: function() {
				$http.get('/cart').then(function(resp) {
					setShoppingCart(resp);
				},function() {
					console.log('faaaail');
				});
			},
			add: function(product) {
				var productsIds = _.map(ShoppingCart.products, function(prod){ return prod.product._id; });

				if(!_.contains(productsIds, product._id)) {
					ShoppingCart.products.push({
						product: product,
						count: 1
					});

					syncCart(ShoppingCart).then(function(resp) {
						setShoppingCart(resp);
					},function(resp) {
						console.log(resp)
					});

					return {
						result: true
					};
				} else {
					return {
						result: false,
						reason: 'The product is already in the shopping cart'
					};
				}
			},
			remove: function(product) {
				ShoppingCart.products = _.reject( ShoppingCart.products, function(pr) { return pr._id === product._id; } );

				syncCart(ShoppingCart).then(function(resp) {
					setShoppingCart(resp);
				});
			},
			empty: function() {
				ShoppingCart.products = [];
			},
			getProducts: function() {
				if(ShoppingCart) {
					return ShoppingCart.products;
				} else {
					return [];
				}
			},
			sync: function() {
				return syncCart(ShoppingCart);
			},
			getProductsCount: function() {
				if(ShoppingCart) {
					return ShoppingCart.products.length;
				} else {
					return 0;
				}
			}
		};
	}]);