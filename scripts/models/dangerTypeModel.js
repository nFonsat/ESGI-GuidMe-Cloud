"use strict";

var DangerTypeModel   = module.exports,
    DangerTypeSchema  = require('../schemas/dangerTypeSchema');

DangerTypeModel.save = function(name, iconUrl, callback){
    var dangerType = new DangerTypeSchema({
        name: name,
        icon: iconUrl
    });

    DangerTypeModel.findOneByName(name, function(err, type){
        if (err) {
            callback(err);
        }
        else {
            dangerType.save(callback);
        }
    });
}

DangerTypeModel.delete = function(dangerTypeId, callback){
    DangerTypeSchema.findByIdAndRemove(dangerTypeId, callback);
}

DangerTypeModel.findOneByName = function(name, callback){
    DangerTypeSchema.findOne({ name: name }, function (err, dangerType){
        if (err) {
            callback(err);
        }
        else {
            callback(null, dangerType);
        }
    });
}

DangerTypeModel.findAll = function(callback){
    DangerTypeSchema.find({}, callback);
}

DangerTypeModel.findById = function (dangerTypeId, callback){
    DangerTypeSchema.findById(dangerTypeId, callback);
}

