"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema(
    { 
        email: { type: String, unique: true}, 
        password: String,
        level: { type: String, default: 0 }
    }
));