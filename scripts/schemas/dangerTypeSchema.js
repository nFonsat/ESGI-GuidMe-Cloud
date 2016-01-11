"use strict";

var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var DangerTypeSchema = new Schema({
    name: { 
        type: String,
        require: true
    },
    icon: { 
        type: String
    }
});

module.exports = mongoose.model('DangerType', DangerTypeSchema);