"use strict";

var LocationModel   = module.exports,
    CoordonateModel = require('../models/coordonateModel'),
    LocationSchema  = require('../schemas/locationSchema');

LocationModel.saveWithLatLng = function(name, userId, latitude, longitude, callback) {
    console.log("Saving location %s with lat : %s and lnt : %s for userID : %s", name, latitude, longitude, userId);
    CoordonateModel.saveCoordonate(latitude, longitude, function (err, coordonate) {
        if (err) {
            console.log("CoordonateModel Error save : %s", err);
            callback(err);
        }
        else {
            var location = new LocationSchema({
                name: name, user: userId, coordonate: coordonate.id
            });

            location.save(callback);
        }
    })
};

LocationModel.getAddressFromCoordonate = function(userId, latitude, longitude, callback) {

};

LocationModel.getAddressByCoordonateId = function(userId, coordonateId, callback) {

};

LocationModel.getAddressesByUserId = function(userId, callback) {
    LocationSchema.find({user:userId})
                  .populate('coordonate')
                  .exec(callback);
};

LocationModel.getAddressesById = function(addressId, callback) {
    LocationSchema.findById(addressId)
                  .populate('coordonate')
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