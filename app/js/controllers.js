'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitlistController', ['$scope', '$firebase','FIREBASEURL', function($scope, $firebase, FIREBASEURL) {
    var partiesRef = new Firebase(FIREBASEURL + 'parties');

    $scope.parties = $firebase(partiesRef);

    $scope.newParty = {name: '', phone: '', size:'', done: false, notified: "No"};

    $scope.saveParty = function(){
      $scope.parties.$add($scope.newParty);
      $scope.newParty = {name: '', phone: '', size:'', done: false,  notified: "No"};
    }

    $scope.removeParty = function(id){
      $scope.parties.$remove(id)
    }

    //(425) 276-7286
    $scope.sendSMS = function(party){
      var textMessageRef = new Firebase(FIREBASEURL + 'textMessages');
      var textMessages = $firebase(textMessageRef);
      var newTextMessage = {
        phoneNumber: party.phone,
        size: party.size,
        name: party.name
      };
      textMessages.$add(newTextMessage);
      party.notified = "Yes";
      $scope.parties.$save(party.$id);
    }
  }])
  .controller('AuthController', ['$scope', 'authService',function($scope, authService){

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
      authService.(logout);
    };
  }]);