"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { 
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    level: {
        type: String,
        default: 0
    },
    email: {
        type: String,
        unique: true,
        default: ''
    }
});

module.exports = mongoose.model('User', UserSchema);