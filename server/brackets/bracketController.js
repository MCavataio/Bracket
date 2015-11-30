var db = require('../db/dbConfig.js');
var Q = require('q');
var jwt = require('jwt-simple');
var helpers = require('../config/helpers.js')
// var Bracket = db.Bracket;
// var Participant = db.Participant;
var Promise = require('bluebird');

module.exports = {
  addBracket: function (req, res, next) {
    var bracket = req.body.title;
    helpers.findOrCreateBracket(bracket)
  },

  addParticipant: function (req, res, next) {
    var name = req.body.name;
    var bracket = req.body.bracket;
    var bracketId;
    var participant = {
      name: name
    }
    helpers.findOrCreateBracket(bracket)
      .then(function (bracket) {
        console.log(bracket)
        participant.bracketId = bracket.id;
        helpers.findOrCreateParticipant(participant)
      }).catch(function (err) {
        console.log("error");
      })
  },

  getParticipants: function(req, res) {
    console.log(req.body.id);
    helpers.getParticipants(req.body.id, function(err, response) {
      if (err) {
        console.log(err);
      } else {
        res.json(response);
      }
    })
  },

  getBrackets: function(req, res) {
    helpers.getBrackets(function(err, response) {
      if (err) {
        console.log(err);
      } else {
        res.json(response)
      }
    })
  }
}



