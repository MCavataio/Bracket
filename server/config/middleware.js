var bodyParser = require('body-parser');
var morgan = require('morgan');
var helpers = require('./helpers.js');

module.exports = function (app, express) {
  var userRouter = express.Router();
  var bracketRouter = express.Router();
  var participantRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  // app.use('/api/users', userRouter);
  app.use('/api/bracket', bracketRouter);

  // app.use('/api/participants' paricipantsRouter);

  require('../brackets/bracketRoutes.js')(bracketRouter);
  // require('../users/userRoutes.js')(userRouter)
}