"use strict";

var LocationModel   = module.exports,
    CoordonateModel = require('../models/coordonateModel'),
    LocationSchema  = require('../schemas/locationSchema');

LocationModel.saveWithLatLng = function(name, userId, latitude, longitude, callback) {
    CoordonateModel.saveCoordonate(latitude, longitude, function (err, coordonate) {
        if (err) {
            callback(err, null);
        }
        else {
            var location = new LocationSchema({
                name: name, userId: userId, coordonateId: coordonate.id
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

LocationModel.updateAddress = function(addressId, newName, newLatitude, newLongitude, callback) {

};

LocationModel.deleteAddress = function(addressId, callback) {

};