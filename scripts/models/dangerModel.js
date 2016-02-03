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
    CoordinateModel.findAllCoordinate(latitude, longitude, distance, limitData, 
        function(err, data) {
            if (err) {
                callback(err);
            }
            else if (data.length == 0) {
                callback(null, data);
            }
            else {
                var dataTofind = [];
                data.forEach(function (coordinate) {
                    dataTofind.push({coordinate: coordinate.id});
                });

                DangerSchema.find({ $or: dataTofind })
                    .populate('type')
                    .populate('coordinate')
                    .exec(function(err, results) {
                        if (err){
                            callback(err);
                        }
                        else {
                            callback(null, results);
                        }
                    }
                );
            }
        }
    );
}

DangerModel.findById = function(dangerId, callback){
    DangerSchema.findById(dangerId)
                .populate('type')
                .populate('coordinate')
                .exec(callback);
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
    DangerSchema.findById(dangerId, function (err, danger) {
        if (err){
            callback(err);
        }
        else if ( !danger ){
            var error = "Data not found";
            callback(error);
        }
        else if (danger.user == userId) {
            danger.name = newName;
            danger.type = newType;
            danger.save(callback);
        } else {
            callback("User not owner");
        }
    });
};

DangerModel.delete = function(dangerId, userId, callback){
    DangerSchema.findById(dangerId, function (err, danger) {
        if (err){
            callback(err);
        }
        else if ( !danger ){
            var error = "Data not found";
            callback(error);
        }
        else if (danger && danger.user == userId){
            danger.remove(callback);
        } else {
            callback("User not owner");
        }
    });
};