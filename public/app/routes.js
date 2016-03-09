angular.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/landing.html',
        controller: 'LandingCtrl'
    });

    $routeProvider.when('/main', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);