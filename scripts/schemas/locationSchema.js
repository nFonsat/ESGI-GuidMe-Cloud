"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
    name: { 
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    coordonateId: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Location', LocationSchema);