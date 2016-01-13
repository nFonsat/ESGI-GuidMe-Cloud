"use strict";

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    ObjectId    = Schema.ObjectId;

var LocationSchema = new Schema({
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
    },
    isfavorite: {
        type : Boolean,
        default: false
    },
    navigateTo: {
        type : Number,
        default: 0
    },
    lastUsed: {
        type : Date,
        default: null
    }
});

module.exports = mongoose.model('Location', LocationSchema);