"use strict";

var config  = require('./config/config.js'),
    fixture = require('./utils/fixture_database.js'),
    utils   = require('./utils/utils.js');

var express     = require('express'),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    oauthserver = require('oauth2-server'),
    mongoose    = require('mongoose');

var app = express();

//Config Mongoose DB
mongoose.connect(config.database.uri, function (err, res) {
    if (err){
        console.log('ERROR connecting to: ' + config.database.uri + '. ' + err);
        throw err;
    }

    console.log("Connection to database : %s", config.database.uri);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//Config Morgan
app.use(morgan('dev'));

app.oauth = oauthserver({
    model: require('./models/oauthModel'),
    grants: ['password', 'refresh_token'],
    debug: true
});

//Router
app.get('/', function(req, res) {
    res.send('Hello!');
});

require('./controllers/userController') (app);
require('./controllers/oauthController') (app);

app.use(app.oauth.errorHandler());

app.listen(config.port, function () {
	console.log("Cloud Guid Me is running on port %s", config.port);
    //utils.listRoutes(app._router);
});