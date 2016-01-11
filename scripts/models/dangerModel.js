"use strict";

var DangerModel     = module.exports,
    CoordinateModel = require('../models/coordinateModel'),
    DangerSchema    = require('../schemas/dangerSchema');

DangerModel.saveWithLatLng = function(name, userId, latitude, longitude, callback){};

DangerModel.getAddressFromCoordinate = function(userId, latitude, longitude, callback){};

DangerModel.getAddressByCoordinateId = function(userId, coordinateId, callback){};

DangerModel.getAddressesByUserId = function(userId, callback){};

DangerModel.getAddressesById = function(addressId, callback){};

DangerModel.updateAddress = function(addressId, newName, callback){};

DangerModel.deleteAddress = function(addressId, callback){};