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

var User = db.define('users', {
  username: Sequelize.STRING
});

var Participant = db.define('participants', {
  name: Sequelize.STRING
})

var Bracket = db.define('brackets', {
  title: Sequelize.STRING

})

var Game = db.define('games', {
  round: Sequelize.INTEGER,
  particpant1: Sequelize.INTEGER,
  participant2: Sequelize.INTEGER,
  round: Sequelize.INTEGER,
  winner: Sequelize.INTEGER
})

Bracket.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Bracket, {foreignKey: 'userId'});
Bracket.hasMany(Participant, {as: 'players'});
Participant.belongsTo(Bracket, {foreignKey: 'bracketId'})
Game.belongsTo(Bracket, {through: 'gameID'})


// db.sync({force: true})
//   .then(function(err) {
//     console.log("Sync Worked!");
//   }, function (err) {
//     console.log('An error occurred while creating the table:', err);
//   });

var plm = Bracket.build({
  title: "pine lake"
})

var scoops = Participant.build({
  name: "Scoops"
})

plm.addPlayers([scoops])

plm.save().then(function() {
  console.log('saved properly')
}).catch(function() {
  console.log("did not save properly")
})
scoops.save().then(function() {
  console.log('saved properly')
}).catch(function() {
  console.log("did not save properly")
})
