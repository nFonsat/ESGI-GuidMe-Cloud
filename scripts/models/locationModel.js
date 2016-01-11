"use strict";

var LocationModel   = module.exports,
    CoordinateModel = require('../models/coordinateModel'),
    LocationSchema  = require('../schemas/locationSchema');

LocationModel.saveWithLatLng = function(name, userId, latitude, longitude, callback) {
    console.log("Saving location %s with lat : %s and lnt : %s for userID : %s", name, latitude, longitude, userId);
    CoordinateModel.saveCoordinate(latitude, longitude, function (err, coordinate) {
        if (err) {
            console.log("CoordinateModel Error save : %s", err);
            callback(err);
        }
        else {
            var location = new LocationSchema({
                name: name, user: userId, coordinate: coordinate.id
            });

            location.save(callback);
        }
    })
};

LocationModel.getAddressFromCoordinate = function(userId, latitude, longitude, callback) {

};

LocationModel.getAddressByCoordinateId = function(userId, coordinateId, callback) {

};

LocationModel.getAddressesByUserId = function(userId, callback) {
    LocationSchema.find({user:userId})
                  .populate('coordinate')
                  .exec(callback);
};

LocationModel.getAddressesById = function(addressId, callback) {
    LocationSchema.findById(addressId)
                  .populate('coordinate')
                  .exec(callback);
};

LocationModel.updateAddress = function(addressId, newName, callback) {
    LocationSchema.findById(addressId, function (err, location) {
        if (err){
            callback(err);
        }
        else {
            location.name = newName;
            location.save(callback);
        }
    });
};

LocationModel.deleteAddress = function(addressId, callback) {
    LocationSchema.findByIdAndRemove(addressId, callback);
};