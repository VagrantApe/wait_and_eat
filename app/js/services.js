'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('FIREBASEURL', 'https://waitandeat-vagrant.firebaseio.com/')
  .factory('authService', function($firebaseSimpleLogin, $location, FIREBASEURL) {
    var authRef = new Firebase(FIREBASEURL);
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
      }
    };
    return authServiceObject;
  });
