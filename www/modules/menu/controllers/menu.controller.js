angular.module('app')
.controller('MenuController', function($scope, $ionicPopup, $state){
    $scope.logout = function(){
        var confirmPopup = $ionicPopup.confirm({
     title: 'Logout Confirmation',
     template: 'Are you sure to logout from this app'
   });

   confirmPopup.then(function(res) {
     if(res) {
       window.localStorage.clear();
       $state.go('registration'); 
     } else {
       
     }
   });
    }
})