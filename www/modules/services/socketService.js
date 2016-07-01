
angular.module('app')
    // .service('SocketService', ['socketFactory', SocketService]);

    // function SocketService(socketFactory){
    //     var profile = JSON.parse(window.localStorage.getItem('profile'));
    //     if(profile != null){
    //          return socketFactory({
    //         ioSocket: io.connect('http://172.19.12.39:3000',{query: 'id='+profile.id})

    //     });
    //     }
    //     else {
    //          return socketFactory({
    //         ioSocket: io.connect('http://172.19.12.39:3000',{query: 'id=null'})

    //     });
    //     }

    // };  

    .factory('SocketService', function (socketFactory) {
        var profile = JSON.parse(window.localStorage.getItem('profile'));
        console.log(profile)
        if (profile == null) {
            profile = {};
            profile.id = null;
        }
        ioSocket = io.connect('http://172.19.12.39:3000', { query: 'id=' + profile.id })
        socketFactory = socketFactory({ ioSocket: ioSocket })

        socketFactory.disconnect = function () {
            ioSocket.disconnect()
        }

        socketFactory.initSocket = function () {
            var profile = JSON.parse(window.localStorage.getItem('profile'));
            console.log(profile)
            if (profile == null) {
                profile = {};
                profile.id = null;
            }
            return io.connect('http://172.19.12.39:3000', { query: 'id=' + profile.id })

        };


        return socketFactory
    });