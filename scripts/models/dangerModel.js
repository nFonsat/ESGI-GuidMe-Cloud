"use strict";

var DangerModel     = module.exports,
    CoordinateModel = require('../models/coordinateModel'),
    DangerTypeModel = require('../models/dangerTypeModel'),
    DangerSchema    = require('../schemas/dangerSchema');

DangerModel.save = function(name, typeId, userId, latitude, longitude, callback){
    CoordinateModel.saveCoordinate(latitude, longitude, function (err, coordinate) {
        if (err) {
            callback(err);
        }
        else {
            var danger = new DangerSchema({
                name: name,
                type: typeId,
                user: userId,
                coordinate: coordinate.id
            });

            danger.save(callback);
        }
    })
};

DangerModel.findByDistanceToPoint = function(latitude, longitude, distance, limitData, callback){
    var limit = limitData || 10;

    var maxDistance = distance || 5;
    maxDistance /= 6371;

    var coords = [];
    coords[0] = latitude;
    coords[1] = longitude;

    // find a location
    DangerSchema.find({
        coordinate : {
            geometry: {
                $near: coords,
                $maxDistance: maxDistance
            }
        }
    }).limit(limit).exec(function(err, data) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, data);
        }
    });
}

DangerModel.findByUserId = function(userId, callback){
    DangerSchema.find({user:userId})
                .populate('type')
                .populate('coordinate')
                .exec(callback);
};

DangerModel.findAll = function(callback){
    DangerSchema.find({})
                .populate('type')
                .populate('coordinate')
                .exec(callback);
};

DangerModel.update = function(dangerId, userId, newName, newType, callback){
    DangerSchema.findById(addressId, function (err, danger) {
        if (err){
            callback(err);
        }
        else if (danger.id == userId) {
            danger.name = newName;
            danger.type = newType;
            danger.save(callback);
        } else {
            callback("User not owner");
        }
    });
};

DangerModel.delete = function(dangerId, userId, callback){
    DangerSchema.findById(addressId, function (err, danger) {
        if (err){
            callback(err);
        }
        else if (danger.id == userId){
            danger.remove(callback);
        } else {
            callback("User not owner");
        }
    });
};