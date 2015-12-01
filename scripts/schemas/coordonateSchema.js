"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CoordonateSchema = new Schema({
    geometry: {
        type: [Number],
        require: true,
        index: '2d'
    }
});

module.exports = mongoose.model('Coordonate', CoordonateSchema);