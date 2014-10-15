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
  .controller('AuthController', ['$scope', '$firebaseSimpleLogin', '$location', 'FIREBASEURL', 'authService',function($scope, $firebaseSimpleLogin, $location, FIREBASEURL, authService){
    var authRef = new Firebase(FIREBASEURL);
    var auth = $firebaseSimpleLogin(authRef);

    $scope.user = {
      email:'',
      password:''
    };

    $scope.register = function(){
      auth.$createUser($scope.user.email, $scope.user.password).then(function(data){
        console.log(data);
        $scope.login();
      })
    };

    $scope.login = function(){
      authService.login($scope.user);
    };

    $scope.logout = function(){
      auth.$logout();
      $location.path('/');
    };
  }]);