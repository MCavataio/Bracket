angular.module("tournament.bracket", [])

.controller("BracketController", function($scope, $window, $location, Bracket) {
  $scope.data = {};
  $scope.teams = [];

  $scope.addTeam = function() {
    $scope.teams.push($scope.data.team)
    $scope.data.team="";
    
  }
  $scope.addBracket = function() {
    $scope.bracketName = $scope.data.bracket
  }
  $scope.saveBracket = function() {
    Bracket.saveBracket($scope.data);
  }
})