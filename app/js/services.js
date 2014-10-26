'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('FIREBASE_URL', 'https://waitandeat-vagrant.firebaseio.com/')
  .factory('dataService', function($firebase, FIREBASE_URL){
    var dataReference = new Firebase(FIREBASE_URL);
    var fireData = $firebase(dataReference);
    return fireData;
  })
  .factory('authService', function(FIREBASE_URL, $firebaseSimpleLogin, $location, $rootScope) {
    var authRef = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(authRef);
    var authServiceObject = {
      register: function(user){
        auth.$createUser(user.email, user.password).then(function(data){
         console.log(data);
         authServiceObject.login(user);
        });
      },
      login: function(user){
        auth.$login('password', user).then(function(data){
          console.log(data);
          $location.path('/waitlist');
        })
      },
      logout: function(){
        auth.$logout();
        $location.path('/');
      },
      getCurrentUser: function(){
        return auth.$getCurrentUser();
      }
    };

    $rootScope.$on("$firebaseSimpleLogin:login", function(e, user){
      $rootScope.currentUser = user;
    });

    $rootScope.$on("$firebaseSimpleLogin:logout", function(){
      $rootScope.currentUser = null;
    });

    return authServiceObject;
  })
  .factory('partyService', function(dataService) {
    var users = dataService.$child('users');

    var partyServiceObject = {
      saveParty: function(party, userId){
       users.$child(userId).$child('parties').$add(party);
      },
      getPartiesByUserId: function(userId){
        return users.$child(userId).$child('parties');
      }
    };

    return partyServiceObject;
  })
  .factory('textMessageService', function(dataService, partyService) {
    //(425) 276-7286
    var textMessages = dataService.$child('textMessages');

    var textMessageServiceObject = {
      sendTextMessage: function (party) {
        var newTextMessage = {
          phoneNumber: party.phone,
          size: party.size,
          name: party.name
        };
        textMessages.$add(newTextMessage);
        party.notified = "Yes";
        partyService.parties.$save(party.$id);
      }
    };
    return textMessageServiceObject;
  });