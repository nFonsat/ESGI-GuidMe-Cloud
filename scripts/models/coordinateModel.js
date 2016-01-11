"use strict";

var CoordinateModel   = module.exports,
    CoordinateSchema  = require('../schemas/coordinateSchema');

CoordinateModel.saveCoordinate = function(latitude, longitude, callback){
    var coordinate = new CoordinateSchema({
        geometry: [latitude, longitude]
    });

    coordinate.save(callback);
}

CoordinateModel.deleteCoordinate = function(latitude, longitude, callback){
    var coords = [];
    coords[0] = latitude;
    coords[1] = longitude;

    CoordinateSchema.remove({geometry: coords}, callback);
}

CoordinateModel.findAllCoordinate = function(latitude, longitude, distance, limitData, callback){
    var limit = limitData || 10;

    var maxDistance = distance || 5;
    maxDistance /= 6371;

    var coords = [];
    coords[0] = latitude;
    coords[1] = longitude;

    // find a location
    CoordinateSchema.find({
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

CoordinateModel.findCoordinateById = function (coordinateId, callback) {
    CoordinateSchema.findById(coordinateId, callback);
}

