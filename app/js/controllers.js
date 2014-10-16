'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitlistController', ['$scope', 'partyService', 'textMessageService' , function($scope, partyService, textMessageService) {

    $scope.parties = partyService.parties;
    $scope.newParty = {name: '', phone: '', size:'', done: false, notified: "No"};

    $scope.saveParty = function(){
      partyService.saveParty($scope.newParty);
      $scope.newParty = {name: '', phone: '', size:'', done: false, notified: "No"};
    };

    $scope.removeParty = function(id){
      $scope.parties.$remove(id)
    };

    //(425) 276-7286
    $scope.sendTextMessage = function(party){
      textMessageService.sendTextMessage(party);
    };
  }])
  .controller('AuthController', ['$scope', 'authService', function($scope, authService){

    $scope.user = {
      email:'',
      password:''
    };

    $scope.register = function(){
      authService.register($scope.user);
    };

    $scope.login = function(){
      authService.login($scope.user);
    };

    $scope.logout = function(){
      authService.logout();
    };
  }]);