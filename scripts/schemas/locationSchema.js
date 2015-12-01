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
    coordonate: { 
        type : ObjectId, 
        ref : 'Coordonate',
        require: true
    }
});

module.exports = mongoose.model('Location', LocationSchema);