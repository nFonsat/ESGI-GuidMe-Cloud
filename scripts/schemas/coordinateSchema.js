"use strict";

var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var CoordinateSchema = new Schema({
    geometry: {
        type: [Number],
        require: true,
        index: '2d'
    }
});

module.exports = mongoose.model('Coordinate', CoordinateSchema);