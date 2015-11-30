angular.module('tournament.services', [])

.factory('Bracket',  function ($http, $location, $window) {
  var addBracket = function(bracket) {
    return $http({
      method: 'POST',
      url: 'api/bracket/addBracket',
      data: {
        "title": bracket
      }
    });
  };

  var getParticipants = function(bracketId) {
    console.log(bracketId)
    return $http({
      method: 'POST',
      url: 'api/bracket/getParticipants',
      data: {
        "id": bracketId
      }
    }).then (function (response) {
      console.log(response);
      return response;
    });
  }

  var getBrackets = function() {
    return $http({
      method: "GET",
      url: 'api/bracket/getBrackets'
    }).then (function (response) {
      return response;
    });
  }

  var addParticipant = function (participant) {
    console.log(participant);
    return $http({
      method: 'POST',
      url: 'api/bracket/addParticipant',
      data: {
        "name": participant.name,
        "bracket": participant.bracket
      }
    })
  }

  return {
    addBracket: addBracket,
    addParticipant: addParticipant,
    getBrackets: getBrackets,
    getParticipants: getParticipants
  }
});
