"use strict";

var DangerModel     = module.exports,
    CoordinateModel = require('../models/coordinateModel'),
    DangerSchema    = require('../schemas/dangerSchema');

DangerModel.saveWithLatLng = function(name, userId, latitude, longitude, callback) {
    CoordinateModel.saveCoordinate(latitude, longitude, function (err, coordinate) {
        if (err) {
            console.log("CoordinateModel Error save : %s", err);
            callback(err);
        }
        else {
            
        }
    })
};

DangerModel.getAddressFromCoordinate = function(userId, latitude, longitude, callback) {

};

DangerModel.getAddressByCoordinateId = function(userId, coordinateId, callback) {

};

DangerModel.getAddressesByUserId = function(userId, callback) {
    DangerSchema.find({user:userId})
                  .populate('coordinate')
                  .exec(callback);
};

DangerModel.getAddressesById = function(addressId, callback) {
    DangerSchema.findById(addressId)
                  .populate('coordinate')
                  .exec(callback);
};

DangerModel.updateAddress = function(addressId, newName, callback) {
    
};

DangerModel.deleteAddress = function(addressId, callback) {
    DangerSchema.findByIdAndRemove(addressId, callback);
};