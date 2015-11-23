var bodyParser = require('body-parser');
var morgan = require('morgan');
var helpers = require('./helpers.js');

module.exports = function (app, express) {
  var userRouter = express.Router();
  var linkRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/users', userRouter);

  // app.use('/api/participants' paricipantsRouter);

  // require('../brackets/bracketRoutes.js')(bracketRoutes);
  // require('../users/userRoutes.js')(userRouter)
}