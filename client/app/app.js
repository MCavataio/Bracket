angular.module('tournament', [
  'tournament.bracket',
  'tournament.home',
  'tournament.services',
  'ui.router'
])

.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl:'home/home.html'
    })
    .state('bracket', {
      url: '/bracket',
      templateUrl:'bracket/bracket.html',
    });
});
