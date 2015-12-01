"use strict";

var LocationController  = module.exports,
    LocationModel       = require('../models/locationModel');

LocationController.postLocation = function (req, res, next) {
    console.log(req.body);
    if (!req.body ||!req.body.name ||!req.body.latitude ||!req.body.longitude ){
        res.status(500).json({ error: 'Check body parameter' });
    }
    else {
        var name        = req.body.name;
        var latitude    = req.body.latitude;
        var longitude   = req.body.longitude;
        console.log(req);

        LocationModel.saveWithLatLng(name, req.user.id, latitude, longitude, 
            function(err, dataSaving) {
                if (err) {
                    console.log("postLocation Error : %s", err)
                    return res.status(500).send({error: "Bad mongoose query"});
                }
                else {
                    LocationModel.getAddressesById(dataSaving.id, function(err, location) {
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

        LocationModel.getAddressesById(locationId, function(err, location) {
            if (err) {
                console.log("getLocation Error : %s", err)
                return res.status(500).send({error: "Bad mongoose query"});
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
            locationId   = req.params.locationId;

        LocationModel.updateAddress(locationId, newName, function(err, dataUpdated) {
            if (err) {
                console.log("updateLocation Error : %s", err)
                return res.status(500).send({error: "Bad mongoose query"});
            }
            else {
                LocationModel.getAddressesById(dataUpdated.id, function(err, location) {
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

        LocationModel.deleteAddress(locationId, function(err, location) {
            if (err) {
                console.log("deleteLocation Error : %s", err)
                return res.status(500).send({error: "Bad mongoose query"});
            }
            else {
                res.json({success: location.id + ' is deleted'});
            }
        });
    }
};

LocationController.getLocations = function (req, res, next) {
    console.log(req);
    LocationModel.getAddressesByUserId(req.user.id, function(err, locations) {
        if (err) {
            console.log("getLocations Error : %s", err)
            return res.status(500).send({error: "Bad mongoose query"});
        }
        else {
            res.json(locations);
        }
    });
};