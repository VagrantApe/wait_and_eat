'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'firebase'
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/', {templateUrl: 'partials/landing_page.html', controller: 'LandingPageController'})
    .when('/waitlist', {templateUrl: 'partials/waitlist.html', controller: 'WaitlistController'})
    .when('/register', {templateUrl: 'partials/register.html', controller: 'AuthController'})
    .when('/login', {templateUrl: 'partials/login.html', controller: 'AuthController'})
    .otherwise({redirectTo: '/'});
}]);
