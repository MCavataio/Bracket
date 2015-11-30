var Promise = require('bluebird');
var db = require('../db/dbConfig.js');
var User = db.User;
var Bracket = db.Bracket;
var Game = db.Game;
var Participant = db.Participant;
var _ = require('underscore');

module.exports = {
  findOrCreateBracket: function (bracket) {
    return new Promise(function (resolve, reject) {
      db.Bracket.findOrCreate({
        where: {
          title: bracket
        }
      }).spread(function (bracket, created) {
        resolve(bracket, created);
      }).catch(reject);
    });
  },

  findOrCreateParticipant: function (participant) {
    console.log(participant)
    return new Promise(function (resolve, reject) {
      db.Participant.findOrCreate({
        where: {
          name: participant.name,
          bracketId: participant.bracketId
        }
      }).spread(function (participant, created) {
        resolve(participant, created);
      }).catch(reject);
    });
  },
  getParticipants: function(bracketId, cb) {
    db.Participant.findAll({
      where: {
        bracketId: bracketId
      }
    }).then(function (participants) {
      cb (null, participants);
    }).catch(function (err) {
      cb(err);
    })
  },

  getBrackets: function (cb) {
    db.Bracket.findAll({})
      .then(function (brackets) {
        cb(null, brackets);
      }).catch(function (err) {
        cb(err);
      })
    }
}