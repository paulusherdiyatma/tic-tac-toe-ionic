//configure angular route here
angular.module('app')
.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $stateProvider
    .state('authorization',{
        url:'authorization',
        views: {
            'content': {
                templateUrl:'modules/authorization/views/authorization.html',
                controller:'AuthorizationController'
            }
        }
    })
    .state('home', {
        url:'home',
        views: {
            'content': {
                templateUrl:'modules/home/views/home.html',
                controller:'HomeController'
            }
        }
    })
    $urlRouterProvider.otherwise(function ($injector, $location) {
		var $state = $injector.get("$state");
		$state.go("home");
	});
});