angular.module('app')
    .controller('RegistrationController', function ($scope, $state, Registration, $ionicPopup, $rootScope, $ionicLoading, SocketService) {
        $scope.username = '';
        $scope.createPlayer = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            $rootScope.username = $scope.username;
            SocketService.emit('createPlayer', $rootScope.username, function (result) {
                $ionicLoading.hide();
                // SocketService.disconnect(close);
                // console.log(result.player.id);
                // SocketService.connect('http://172.19.12.39:3000',{query: 'id='+result.player.id})
            // SocketService.options.query = 'id='+result.player.id;

                if (result.status != 200) {
                    $ionicPopup.alert({
                        title: 'Message',
                        content: result.message
                    }).then(function (res) {
                    });
                }
                else {
                    window.localStorage.setItem('profile', JSON.stringify(result.player));
                    SocketService.disconnect();
                    
                    $ionicPopup.alert({
                        title: 'Message',
                        content: result.message
                    }).then(function (res) {
                        $rootScope.player = result.player;
                         window.localStorage.setItem('profile', JSON.stringify(result.player));
                         SocketService.initSocket();
                        $state.go('menu.home');
                    });

                }

            });
        };
    })

 


