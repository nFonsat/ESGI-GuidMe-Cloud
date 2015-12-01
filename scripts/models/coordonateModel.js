"use strict";

var CoordonateModel   = module.exports,
    CoordonateSchema  = require('../schemas/coordonateSchema');

CoordonateModel.saveCoordonate = function(latitude, longitude, callback){
    var coordonate = new CoordonateSchema({
        geometry: [latitude, longitude]
    });

    coordonate.save(callback);
}

CoordonateModel.deleteCoordonate = function(latitude, longitude, callback){
    var coords = [];
    coords[0] = latitude;
    coords[1] = longitude;

    CoordonateSchema.remove({geometry: coords}, callback);
}

CoordonateModel.findAllCoordonate = function(latitude, longitude, distance, limitData, callback){
    var limit = limitData || 10;

    var maxDistance = distance || 5;
    maxDistance /= 6371;

    var coords = [];
    coords[0] = latitude;
    coords[1] = longitude;

    // find a location
    CoordonateSchema.find({
      geometry: {
        $near: coords,
        $maxDistance: maxDistance
      }
    }).limit(limit).exec(function(err, locations) {
      if (err) {
        return callback(null);
      }

      callback(locations);
    });
}

CoordonateModel.findCoordonateById = function (coordonateId, callback) {
    CoordonateSchema.findById(coordonateId, callback);
}

