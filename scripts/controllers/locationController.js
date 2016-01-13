"use strict";

var LocationController  = module.exports,
    LocationModel       = require('../models/locationModel');

function displayLocation(res, err, location) {
    if (err) {
        return res.status(500).send({error: err});
    }
    else if (!location) {
        return res.status(500).send({error: "Location not found"});
    }
    else {
        res.json(location);
    }
}

function displayLocations(res, err, locations) {
    if (err) {
        return res.status(500).send({error: "Bad mongoose query"});
    }
    else {
        res.json(locations);
    }
}

LocationController.postLocation = function (req, res, next) {
    if (!req.body ||!req.body.name ||!req.body.latitude ||!req.body.longitude ){
        res.status(500).json({ error: 'Check body parameter' });
    }
    else {
        var name        = req.body.name,
            latitude    = req.body.latitude,
            longitude   = req.body.longitude,
            userId      = req.user.id,
            isfavorite  = req.body.isfavorite || false;

        LocationModel.save(name, userId, latitude, longitude, isfavorite,
            function(err, dataSaving) {
                if (err) {
                    return res.status(500).send({error: err});
                }
                else {
                    LocationModel.findById(dataSaving.id, function(err, location) {
                        displayLocation(res, err, location);
                    });
                }
            }
        );
    }
}

LocationController.getLocation = function (req, res, next) {
    if (!req.params ||!req.params.locationId){
        res.status(500).json({ error: 'assign location id in url' });
    }
    else {
        var locationId = req.params.locationId;

        LocationModel.findById(locationId, function(err, location) {
            displayLocation(res, err, location);
        });
    }
}

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
                    displayLocation(res, err, location);
                });
            }
        });
    }
}

LocationController.deleteLocation = function (req, res, next) {
    if (!req.params ||!req.params.locationId){
        res.status(500).json({ error: 'assign location id in url' });
    }
    else {
        var locationId = req.params.locationId;

        LocationModel.delete(locationId, function(err, location) {
            displayLocation(res, err, location);
        });
    }
}

LocationController.getLocations = function (req, res, next) {
    if (req.query.favorite || req.query.favorite == '') {
        LocationModel.findByUserIdAndFavorite(req.user.id, 
            function(err, locations) {
                displayLocations(res, err, locations);
            }
        );
    }
    else {
        LocationModel.findByUserId(req.user.id, 
            function(err, locations) {
                displayLocations(res, err, locations);
            }
        );
    }
}

LocationController.playLocation = function(req, res, next) {
    var locationId  = req.params.locationId;

    if ( !locationId ){
        res.status(500).json({ error: 'assign location id in url' });
    }
    else {
        LocationModel.play(locationId,
            function(err, location) {
                displayLocation(res, err, location);
            }
        );
    }
}

LocationController.postFavorite = function (req, res, next) {
    var userId      = req.user.id,
        locationId  = req.params.locationId;

    if ( !locationId ){
        res.status(500).json({ error: 'assign location id in url' });
    }
    else {
        LocationModel.addFavorite(locationId, userId, 
            function(err, location) {
                displayLocation(res, err, location);
            }
        );
    }
}

LocationController.deleteFavorite = function (req, res, next) {
    var userId      = req.user.id,
        locationId  = req.params.locationId;

    if ( !locationId ){
        res.status(500).json({ error: 'assign location id in url' });
    }
    else {
        LocationModel.deleteFavorite(locationId, userId, 
            function(err, location) {
                displayLocation(res, err, location);
            }
        );
    }
}