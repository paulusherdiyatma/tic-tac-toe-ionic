//configure angular route here
angular.module('app')
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider
            .state('welcome', {
                url: 'welcome',
                views: {
                    'content': {
                        templateUrl: 'modules/welcome/views/welcome.html',
                        controller: 'WelcomeController'
                    }
                }
            })
            .state('registration', {
                url: 'registration',
                views: {
                    'content': {
                        templateUrl: 'modules/registration/views/registration.html',
                        controller: 'RegistrationController'
                    }
                }
            })
            .state('menu', {
                url: "/menu",
                abstract: true,
                views: {
                    'content': {
                        templateUrl: 'modules/menu/views/menu.html',
                        controller: 'MenuController'
                    }
                }
            })
            .state('menu.home', {
                url: '/home',
                views: {
                    'menu-content': {
                        templateUrl: 'modules/home/views/home.html',
                        controller: 'HomeController'
                    }
                }
            })
            .state('menu.profile', {
                url: '/profile',
                views: {
                    'menu-content': {
                        templateUrl: 'modules/profile/views/profile.html',
                        controller: 'ProfileController'
                    }
                }
            })

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var $state = $injector.get("$state");

            var profile = window.localStorage.getItem('profile'); 

            if(profile == null){
            $state.go("registration");
            }
            else {
               $state.go("menu.home"); 
            }
        });
    });