"use strict";

var utils = require('../utils.utils.js')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema(
	{ 
	    guid: { type: String, unique: true, default: utils.guuid() }, 
	    username: String, 
	    password: String
	}
));