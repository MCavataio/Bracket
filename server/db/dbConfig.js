var Sequelize = require('sequelize');
var path = require('path');
var fs = require('fs');
var mysql = require('mysql');


if (process.env.NODE_ENV === 'production') {
  var sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  // vadr secret = require('../lib/secrets').sql || "blue";
  var db = new Sequelize('pinelake', 'root', "null", {
    dialect: 'mysql',
    port: 3306
  });
}
db.authenticate()
  .then(function(err) {
    console.log("connected!");
  })
  .catch(function (err) {
    console.log("Not Connected!", err)
  })
  .done();

var User = db.define('user', {
  username: Sequelize.STRING
});

var Participant = db.define('participant', {
  name: Sequelize.STRING,
})

var Bracket = db.define('bracket', {
  title: Sequelize.STRING

})

var Game = db.define('game', {
  round: Sequelize.INTEGER,
  particpant1: Sequelize.INTEGER,
  participant2: Sequelize.INTEGER,
  round: Sequelize.INTEGER,
  winner: Sequelize.INTEGER
})

Bracket.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Bracket, {foreignKey: 'userId'});
Bracket.hasMany(Participant, {foreignKey: "bracketId"})
Participant.belongsTo(Bracket, {foreignKey: 'bracketId'})
Game.belongsTo(Bracket, {through: 'gameId'})


db.sync({})
  .then(function(err) {
    console.log('created database')
  }, function (err) {
    console.log("An error occurred while creating the table:", err)
  })


module.exports = {
  Participant: Participant,
  Bracket: Bracket,
  User: User,
  Game: Game
};



  
  // plm.save().then(function() {
  //   console.log('saved properly')
  // }).catch(function() {
  //   console.log("did not save properly")
  // })
  // scoops.save().then(function() {
  //   console.log('saved properly')
  // }).catch(function() {
  //   console.log("did not save properly")
  // })






// plm.addParticipant([scoops])
