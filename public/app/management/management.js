
function makeSelects(selector) {
	var selects;

	if(_.isUndefined(selector)) {
		selects = $('select');
	} else {
		selects = $(selector);
	} 

	if(selects.length) {
		selects.material_select();
		$('.input-field > .caret').remove();
	}
}

function fetchUsers($scope, $http) {
	$http.get('/user').then(function(resp) {
		$scope.users = resp.data;
	});
}

function fetchCategories($scope, $http) {
	$http.get('/category').then(function(resp) {
		$scope.categories = resp.data;
		_.defer(function() {
			makeSelects();
		});
	}, function() {

	});
}

angular.module('vamotors.management', ['ngRoute', 'ui.tree', 'vamotors.category.attributes', 'ngFileUpload'])
	.config(['$routeProvider', function($routeProvider) { 
		$routeProvider.when('/admin', {
	        templateUrl: 'management/management.html',
	        controller: 'AdminCtrl'
	    });
	}])
	.controller('AdminCtrl', ['$scope', '$http', '$location', 'va.attributes', 'AuthService', 'Upload', function($scope, $http, $loc, attributes, AuthService, Upload) {
		$scope.newProduct = {
			image_url: '/media/no_image.png',
			manufacturer: '',
			model: '',
			attributes: {},
			category: {}
		};

		$scope.availableAttributes = attributes;
		$scope.categories = [];

		// upload on file select or drop
	    $scope.upload = function (file) {
	        Upload.upload({
	            url: '/product/image',
	            file: file
	        }).progress(function (evt) {
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            console.log(evt);
	        }).success(function (data, status, headers, config) {
	        	$scope.newProduct.image_url = data.image_url;
	        }).error(function (data, status, headers, config) {
	            console.log('error status: ' + status);
	        })
	    };

		$scope.onProductsActive = function() {
			_.defer(function() {
				makeSelects('#category-select');
				makeSelects('#new-product-attributes select');
			});
		};

		$scope.onCategorySelect = function(category) {
			_.defer(function() {
				makeSelects('#new-product-attributes select');
			});
		};

		$scope.addCategory = function() {
			this.categories.unshift({
				name: '',
				attributes: []
			});
			_.defer(function() {
				makeSelects();
			});
		};

		$scope.saveCategory = function(cat) {
			cat.synchronizing = true;
			if(!cat._id) {
				$http.post('/category', cat).then(function(resp) {
					cat._id = resp.data._id;
					cat.synchronizing = false;
				}, function(resp) { 
					console.log(resp);
				});
			} else {
				$http.put('/category/' + cat._id, cat).then(function(resp) {
					cat.synchronizing = false;
				}, function(resp) { 
					console.log(resp);
				});
			}
		};

		$scope.saveProduct = function(product) {
			if(!product._id) {
				$http.post('/product', product).then(function(resp) {
					console.log(resp.data);
				},function(resp){
					console.log('error adding product');
				});
			}
		};

		$scope.removeAttributeFromCategory = function(category, attr) {
			category.attributes = _.without(category.attributes, attr);
		};

		fetchCategories($scope, $http);
		fetchUsers($scope, $http);

		if(!AuthService.isAdmin()) {
			$loc.path('/');
		} else {
			$('ul.tabs').tabs();
		}
}]);