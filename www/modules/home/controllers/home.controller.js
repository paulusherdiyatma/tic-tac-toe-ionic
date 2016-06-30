angular.module('app')
    .controller('HomeController', function (Home, $scope, $ionicPopup, SocketService, $rootScope, $ionicLoading, Guid) {
        // var socket = SocketService('/join-game');
        SocketService.emit('createGame', 'aaaaa');
        $scope.player = JSON.parse(window.localStorage.getItem('profile'));

        SocketService.emit('getProfile', $scope.player.id, function (result) {
            $scope.player = result;
            console.log(result);
        });

        SocketService.on('createGameResult', function (test) {
            console.log(test);
        })

        $scope.play = function () {
            $scope.isTheGameEnd = false;
            $ionicLoading.show({
                template: 'Loading...'
            });

            SocketService.emit('play', $scope.player, function (result) {
                console.log(result);
                if (result.status == 404) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Message',
                        content: result.message
                    }).then(function (res) {
                    });
                }
            });
        }

        var challange = 'challange:' + $scope.player.id;

        SocketService.on(challange, function (opponent) {
            $ionicPopup.confirm({
                title: 'Message',
                content: opponent.username + ' wants to play with you. Do you want to play?'
            }).then(function (res) {
                var players = [$scope.player, opponent];
                if (res) {
                    var guidRoom = Guid.newGuid();
                    SocketService.emit('accept', guidRoom, players);
                } else {
                    SocketService.emit('reject', players);
                }
            });
        })

        var rejected = 'rejected:' + $scope.player.id;
        SocketService.on(rejected, function (opponent) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Message',
                content: 'Your challange has been rejected by ' + opponent.username
            }).then(function (res) {
            });
        })

        var accepted = 'accepted:' + $scope.player.id;
        SocketService.on(accepted, function (roomId, players) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Message',
                content: 'Your challange has been accepted by ' + players[0].username
            }).then(function (res) {
                SocketService.emit('joinRoom', roomId, players);
            });
        })

        SocketService.on('game', function (roomId, data) {
            SocketService.emit('getProfile', $scope.player.id, function (result) {
                $scope.player = result;
            });

            $scope.nextPlayer = data.nextPlayer;
            $scope.gamePlayed = true;
            $scope.dataId = data.id;

            if ($scope.player.id == data.typeOfIcon[0].playerId) {

                $scope.typeOfIcon = data.typeOfIcon[0].type;
            }
            else {
                $scope.typeOfIcon = data.typeOfIcon[1].type;
            }

            $scope.player1 = data.players[0].username;

            $scope.player2 = data.players[1].username;


            $scope.player1 = data.players[0].username;
            $scope.icon1 = "O";

            $scope.player2 = data.players[1].username;
            $scope.icon2 = "X";

            var gameData = data.steps;
            $rootScope.roomId = roomId;
            var firstData = [gameData[0], gameData[1], gameData[2]];
            var secondData = [gameData[3], gameData[4], gameData[5]];
            var thirdData = [gameData[6], gameData[7], gameData[8]];
            $scope.gameData = [firstData, secondData, thirdData];
            console.log($scope.gameData);


        })

        var nsp;

        $scope.checkType = function (type) {
            if (type == 'cross') {
                return 'col-game-x';
            }
            else if (type == 'circle') {
                return 'col-game-o';
            }
            else {
                return '';
            }

        }


        SocketService.on('gameEnded', function (data, player) {
            $ionicPopup.alert({
                title: 'Message',
                content: player.username + ' has ended the game!'
            }).then(function (res) {
            });

            SocketService.emit('getProfile', $scope.player.id, function (result) {
                $scope.player = result;
                console.log(result);
            });

        })


        SocketService.on('gameDraw', function (data) {
            $ionicPopup.alert({
                title: 'Message',
                content: 'games draw!'
            }).then(function (res) {
            });

            $ionicLoading.hide();
            $scope.gamePlayed = false;

            SocketService.emit('getProfile', $scope.player.id, function (result) {
                $scope.player = result;
                console.log(result);
            });
        })

        SocketService.on('movement', function (data) {
            $scope.isTheGameEnd = false;
            var gameData = data.steps;
            $scope.nextPlayer = data.nextPlayer;
            var firstData = [gameData[0], gameData[1], gameData[2]];
            var secondData = [gameData[3], gameData[4], gameData[5]];
            var thirdData = [gameData[6], gameData[7], gameData[8]];
            $scope.gameData = [firstData, secondData, thirdData];

            if (data.winner != null) {
                SocketService.emit('getProfile', $scope.player.id, function (result) {
                    $scope.player = result;
                    console.log(result);
                });

                $scope.isTheGameEnd = true;
                $ionicPopup.alert({
                    title: 'Message',
                    content: data.winner.username + ' wins the game!'
                }).then(function (res) {
                });
            }

            $ionicLoading.hide();
        })
        $scope.chooseThis = function (selectedData) {
            if ($scope.isTheGameEnd) {
                $ionicPopup.alert({
                    title: 'Message',
                    content: 'The game end. Do you want to play again?'
                }).then(function (res) {
                });
            }
            else {
                if ($scope.nextPlayer != $scope.player.id) {
                    $ionicPopup.alert({
                        title: 'Message',
                        content: 'Not your turn'
                    }).then(function (res) {
                    });
                }
                else {
                    $ionicLoading.show({
                        template: 'Loading...'
                    });

                    if (selectedData.type != 'none') {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Message',
                            content: 'Box has been selected!'
                        }).then(function (res) {
                        });
                    }
                    else {
                        SocketService.emit("movement", { "room": $rootScope.roomId, "data": selectedData, "id": $scope.dataId, "player": $scope.player, "type": $scope.typeOfIcon });
                    }
                }
            }

        }

        $scope.endGame = function () {
            $scope.gamePlayed = false;
            SocketService.emit("endGame", { "room": $rootScope.roomId, "id": $scope.dataId, "player": $scope.player });
        }
    })