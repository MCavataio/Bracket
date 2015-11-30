var bracketController = require('./bracketController.js');

module.exports = function (app) {
  app.post('/addBracket', bracketController.addBracket);
  app.post('/addParticipant', bracketController.addParticipant);
  app.get('/getBrackets', bracketController.getBrackets);
  app.post('/getParticipants', bracketController.getParticipants);
}