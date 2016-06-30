angular.module('app')
.controller('WelcomeController', function($scope, $state){
    $scope.goToRegistrationPage = function() {
        $state.go('registration');
    };
    
})