'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitlistController', ['$scope', 'partyService', 'textMessageService', 'authService' , function($scope, partyService, textMessageService, authService) {
    authService.getCurrentUser().then(function(user){
      if(user){
        $scope.parties = partyService.getPartiesByUserId(user.id);
      }
    });
    $scope.newParty = {name: '', phone: '', size:'', done: false, notified: "No"};

    $scope.saveParty = function(){
      partyService.saveParty($scope.newParty, $scope.currentUser.id);
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