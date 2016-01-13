"use strict";

var LocationModel   = module.exports,
    CoordinateModel = require('../models/coordinateModel'),
    LocationSchema  = require('../schemas/locationSchema');

function saveLocation(name, userId, latitude, longitude, isfavorite, callback) {
    LocationModel.findOneByNameAndUserId(name, userId, 
        function(err, result){
            if (err) {
                callback(err);
            }
            else if (result) {
                console.log("Test ", result);
                var error = "This name " + result.name + " already exists";
                callback(error);
            }
            else {
                CoordinateModel.saveCoordinate(latitude, longitude, function (err, coordinate) {
                    if (err) {
                        callback(err);
                    }
                    else {
                        var location = new LocationSchema({
                            name: name, 
                            user: userId, 
                            coordinate: coordinate.id,
                            isfavorite: isfavorite
                        });

                        location.save(callback);
                    }
                });
            }
        }
    );
}

function updateLocation(location, callback) {
    LocationModel.findOneByNameAndUserId(location.name, location.user, 
        function(err, result){
            if (err) {
                callback(err);
            }
            else if (result && result.id != location.id) {
                var error = "This name " + result.name + " already exists";
                callback(error);
            }
            else {
                location.save(callback);
            }
        }
    );
}

LocationModel.save = function(name, userId, latitude, longitude, callback) {
    saveLocation(name, userId, latitude, longitude, false, callback);
}

LocationModel.saveFavorite = function(name, userId, latitude, longitude, callback) {
    saveLocation(name, userId, latitude, longitude, true, callback);
}

LocationModel.findOneByNameAndUserId = function(name, userId, callback) {
    LocationSchema.findOne({ name: name, user: userId })
                  .populate('coordinate')
                  .exec(callback);
}

LocationModel.findByUserId = function(userId, callback) {
    LocationSchema.find({user:userId})
                  .populate('coordinate')
                  .exec(callback);
};

LocationModel.findById = function(addressId, callback) {
    LocationSchema.findById(addressId)
                  .populate('coordinate')
                  .exec(callback);
};

LocationModel.update = function(addressId, userId, newName, callback) {
    LocationSchema.findById(addressId, function (err, location) {
        if (err){
            callback(err);
        }
        else if ( !location ){
            var error = "Data not found";
            callback(error);
        }
        else if (location.user == userId) {
            location.name = newName;
            updateLocation(location, callback);
        } else {
            callback("User not owner");
        }
    });
};

LocationModel.delete = function(addressId, callback) {
    LocationSchema.findByIdAndRemove(addressId, callback);
};

LocationModel.play = function(addressId, callback) {
    LocationSchema.findById(addressId, function (err, location) {
        if (err){
            callback(err);
        }
        else {
            location.lastUsed = new Date();
            location.navigateTo++;
            location.save(callback);
        }
    });
};