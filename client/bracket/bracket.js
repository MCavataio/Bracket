
angular.module("tournament.bracket", [])


.controller("BracketController", function($scope, $window, $location, Bracket) {
  $scope.data = {};
  $scope.teams = [];
  $scope.brackets = [];
  var bracketId;

  $scope.getBrackets = function() {
    Bracket.getBrackets()
    .then(function(brackets) {
      $scope.brackets = brackets.data
    }).catch(function(error) {
      console.log("Error in retrieving brackets", error)
    })
  };

  $scope.getParticipants = function(bracket) {
    console.log(bracket)
    $scope.bracketName = bracket.title;
    bracketId = bracket.id;
    Bracket.getParticipants(bracketId)
      .then(function(participants) {
        $scope.teams = participants.data;
      }).catch(function(error) {
        console.log("Error in retrieving participants", error)
      })
  };

  $scope.addParticipant = function() {
    $scope.teams.push($scope.data.team)
    console.log("in addTeam");
    var participant = {
      name: $scope.data.team,
      bracket: $scope.bracketName
    }
    $scope.data.team ="";

    Bracket.addParticipant(participant)
      .then(function() {
        $scope.data.team=""; 
      }).catch(function (error) {
        console.log("Error in adding Team", error);
        $scope.data.bracket = "";
      })
  };
  $scope.addBracket = function() {
    $scope.bracketName = $scope.data.bracket
    Bracket.addBracket($scope.data.bracket)
      .then(function() {
        console.log("in addBracket");
        $scope.data.bracket= "";  
      }).catch(function (error) {
        console.log("Error in adding Bracket", error);
        $scope.data.bracket = "";
      })
  };

  $scope.saveBracket = function() {
    Bracket.saveBracket($scope.data);
  };

  $scope.getBrackets()
})
