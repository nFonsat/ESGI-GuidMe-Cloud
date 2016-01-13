"use strict";

var LocationController  = module.exports,
    LocationModel       = require('../models/locationModel');

LocationController.postLocation = function (req, res, next) {
    if (!req.body ||!req.body.name ||!req.body.latitude ||!req.body.longitude ){
        res.status(500).json({ error: 'Check body parameter' });
    }
    else {
        var name        = req.body.name;
        var latitude    = req.body.latitude;
        var longitude   = req.body.longitude;

        LocationModel.save(name, req.user.id, latitude, longitude, 
            function(err, dataSaving) {
                if (err) {
                    return res.status(500).send({error: err});
                }
                else {
                    LocationModel.findById(dataSaving.id, function(err, location) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        else {
                            res.json(location);
                        }
                    });
                }
            }
        );
    }
};

LocationController.getLocation = function (req, res, next) {
    if (!req.params ||!req.params.locationId){
        res.status(500).json({ error: 'assign location id in url' });
    }
    else {
        var locationId = req.params.locationId;

        LocationModel.findById(locationId, function(err, location) {
            if (err) {
                return res.status(500).send({error: "Bad mongoose query"});
            }
            else if (!location) {
                return res.status(500).send({error: "Location not found"});
            }
            else {
                res.json(location);
            }
        });
    }
};

LocationController.updateLocation = function (req, res, next) {
    if ((!req.params ||!req.params.locationId) || (!req.body ||!req.body.name)){
        res.status(500).json({ error: 'Check parameter' });
    }
    else {
        var newName     = req.body.name,
            locationId  = req.params.locationId,
            userId      = req.user.id;

        LocationModel.update(locationId, userId, newName,function(err, dataUpdated) {
            if (err) {
                return res.status(500).send({error: err});
            }
            else {
                LocationModel.findById(dataUpdated.id, function(err, location) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        res.json(location);
                    }
                });
            }
        });
    }
};

LocationController.deleteLocation = function (req, res, next) {
    if (!req.params ||!req.params.locationId){
        res.status(500).json({ error: 'assign location id in url' });
    }
    else {
        var locationId = req.params.locationId;

        LocationModel.delete(locationId, function(err, location) {
            if (err) {
                return res.status(500).send({error: "Bad mongoose query"});
            }
            else if ( !location ) {
                return res.status(500).send({error: "Location not found"});
            }
            else {
                res.json({deleted:true, data:location});
            }
        });
    }
};

LocationController.getLocations = function (req, res, next) {
    LocationModel.findByUserId(req.user.id, function(err, locations) {
        if (err) {
            return res.status(500).send({error: "Bad mongoose query"});
        }
        else {
            res.json(locations);
        }
    });
};