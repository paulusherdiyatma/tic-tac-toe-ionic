angular.module('app')
.controller('HomeController', function(Home){
    
    //call POST REST API
    Home.postUserInfo({}).then(function(result){
        //TODO:do something when request is successfully submitted
    }, function(error){
        //TODO:do something when request is invalid/error
    })
    
    //call GET REST API
    Home.getUserInfo({}).then(function(result){
        //TODO:do something when request is successfully submitted
    }, function(error){
        //TODO:do something when request is invalid/error
    })
})