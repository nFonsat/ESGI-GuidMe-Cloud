"use strict";

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    ObjectId    = Schema.ObjectId;

var DangerSchema = new Schema({
    name: { 
        type: String,
        require: true
    },
    user: { 
        type : ObjectId, 
        ref : 'User',
        require: true
    },
    coordinate: { 
        type : ObjectId, 
        ref : 'Coordinate',
        require: true
    }
});

module.exports = mongoose.model('Danger', DangerSchema);