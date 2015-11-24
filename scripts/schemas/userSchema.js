"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { 
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    level: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        require: true,
        unique: true,
        default: ''
    }
});

module.exports = mongoose.model('User', UserSchema);