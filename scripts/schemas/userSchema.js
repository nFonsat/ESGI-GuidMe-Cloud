"use strict";

var mongoose    = require('mongoose'),
    SHA512      = require("crypto-js/sha512"),
    Schema      = mongoose.Schema;

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

UserSchema.pre('save', function (next) {
    var plainPassword = this.password;
    this.password = SHA512(plainPassword);
    next();
})

module.exports = mongoose.model('User', UserSchema);