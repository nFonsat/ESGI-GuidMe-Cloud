"use strict";

var config = require('./config/config.js');

var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt         = require('jsonwebtoken');

var app = express();

//Config Mongoose DB
var appConnection = mongoose.createConnection(config.database.uri);
appConnection.on('error', console.error.bind(console, 'connection error:'));
appConnection.once('open', function callback () {
  console.log("Connection to database etablish");
});

app.set('superSecret', config.database.secret);

//Config Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Config Morgan
app.use(morgan('dev'));

//Router
app.get('/', function(req, res) {
    res.send('Hello!');
});

var apiRoutes = express.Router();

app.use(config.api.base_url, apiRoutes);

app.listen(config.port, function () {
	console.log("Cloud Guid Me is running on port %s", config.port);
});