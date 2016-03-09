angular.module('vamotors.sidenav',[])
	.controller('SideNavCtrl', function($scope, $http, $location, $attrs, $element) {

		var check = function() {
			console.log($attrs.hideon);
			if ($location.path() === $attrs.hideon) {
		    	$element.hide();

		    } else {
		    	$element.show();
		    }
		};

		$scope.$on('$locationChangeStart', function() {
		    check();
		});

		$http.get('/category').then(function(resp) {
			$scope.categories = resp.data;
		}, function() {

		});

		check();
	})
	.directive('vaSidenav', function() {
		return {
			controller: 'SideNavCtrl',
			templateUrl: 'directives/sidenav/sidenav.html'
		}
	});