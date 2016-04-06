angular.module('app')
    .service('Home', function($http, $q, RestApi) {
        this.postUserInfo = function(data) {
            var deferred = $q.defer(),
                path = '/info';

            $http({ method: 'POST', url: RestApi.url, data: data }).then(onSuccess, onFail);

            function onSuccess(response) {
                deferred.resolve(response);
            }

            function onFail(error) {
                deferred.reject(error);
            }

            return deferred.promise;
        }
        
        this.getUserInfo = function(data) {
            var deferred = $q.defer(),
                path = '/info';

            $http({ method: 'GET', url: RestApi.url, data: data }).then(onSuccess, onFail);

            function onSuccess(response) {
                deferred.resolve(response);
            }

            function onFail(error) {
                deferred.reject(error);
            }

            return deferred.promise;
        }
    })