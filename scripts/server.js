"use strict";

var config  = require('./config/config'),
    fixture = require('./utils/fixture_database'),
    utils   = require('./utils/utils');

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

//Config OAuthServer
app.oauth = oauthserver({
    model: require('./models/oauthModel'),
    grants: ['password', 'refresh_token'],
    debug: true
});

//Router
require('./config/routing') (app);

app.use(app.oauth.errorHandler());

app.listen(config.port, function () {
	console.log("Cloud Guid Me is running on port %s", config.port);
});
