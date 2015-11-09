"use strict";

var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');

var config = require('./config/config.js');

var app = express();

var apiRoutes = express.Router();

app.use(config.api.base_url, apiRoutes);

app.use(morgan('dev'));

app.listen(config.port, function () {
	console.log("Cloud Guid Me is running on port %s", config.port);
});