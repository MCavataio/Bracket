var Sequelize = require('sequelize');


if (process.env.NODE_ENV === 'production') {
  var sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  // var secret = require('../lib/secrets').sql || "blue";
  var db = new Sequelize('pinelake', 'root', "null", {
    dialect: "mysql",
    port: 3306
  });
}
db
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the datbase: ', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })

var User = db.define('users', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
});
var Participant = db.define('participants', {
  name: Sequelize.STRING;
})

var Bracket = db.define('brackets', {
  title: Sequelize.STRING;
})

var Game = db.define('games', {
  round: Sequelize.NUMBER;
  particpant1: Sequelize.NUMBER;
  participant2: Sequelize.NUMBER;
  round: Sequelize.NUMBER;
  winner: Sequelize.NUMBER
})

Bracket.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Bracket, {foreignKey: 'userId'});
Bracket.hasMany(Participant, {foreignKey: 'bracketId' })
Participant.belongsTo(Bracket, {foreignKey: 'bracketId'})
Game.belongsTo(bracket, {through: 'gameID'})

User.sync({force: true});
Participant.sync({force: true});
Bracket.sync({force: true});
Game.sync({force: true});
db.sync({force: true})
