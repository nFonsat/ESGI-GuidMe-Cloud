"use strict";

var config = require('./config/config.js');
var utils = require('./utils/utils.js');

var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt         = require('jsonwebtoken');

var app = express();

//Config Mongoose DB
mongoose.connect(config.database.uri, function (err, res) {
    if (err){
        console.log('ERROR connecting to: ' + config.database.uri + '. ' + err);
        throw err;
    }

    console.log("Connection to database : %s", config.database.uri);
});

app.set('superSecret', config.database.secret);

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/json' }));

//Config Morgan
app.use(morgan('dev'));

//Router
app.get('/', function(req, res) {
    res.send('Hello!');
});

require('./controllers/userController') (app);

app.listen(config.port, function () {
	console.log("Cloud Guid Me is running on port %s", config.port);
    utils.listRoutes(app._router);
});