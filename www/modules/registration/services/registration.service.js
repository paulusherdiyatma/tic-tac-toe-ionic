angular.module('app')
    .service('Registration', function($http, $q, RestApi) {
        this.createPlayer = function(username) {
            var deferred = $q.defer(),
                path = RestApi.url+'/players';

            $http({ method: 'POST', url: path, data: {"username":username} }).then(onSuccess, onFail);

            function onSuccess(response) {
                deferred.resolve(response.data);
            }

            function onFail(error) {
                deferred.reject(error);
            }

            return deferred.promise;
        }
    })