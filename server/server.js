var express = require ('express');
var app = express();
var db = require("./db/dbconfig.js");


require('./config/middleware.js')(app, express);

app.listen(5555);
console.log("connected to port: 5555")

module.exports = app;