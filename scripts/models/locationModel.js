"use strict";

var LocationModel   = module.exports,
    CoordonateModel = require('../models/coordonateModel'),
    LocationSchema  = require('../schemas/locationSchema');

LocationModel.saveWithLatLng = function(name, userId, latitude, longitude, callback) {
    CoordonateModel.saveCoordonate(latitude, longitude, function (err, coordonate) {
        if (err) {
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

LocationModel.getAddressesByName = function(userId, name, callback) {

};

LocationModel.getAddressesById = function(addressId, callback) {
    LocationSchema.findById(addressId)
                  .populate('coordonate')
                  .exec(callback);
};

LocationModel.updateAddress = function(addressId, newName, newLatitude, newLongitude, callback) {

};

LocationModel.deleteAddress = function(addressId, callback) {

};