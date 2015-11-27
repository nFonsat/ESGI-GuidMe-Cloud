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

        LocationModel.saveWithLatLng(name, req.user.id, latitude, longitude, 
            function(err, dataSaving) {
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    LocationModel.getAddressesById(dataSaving.id, function(err, location) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        else {
                            console.log(location);
                            res.json(location);
                        }
                    });
                }
            }
        );
    }
};

LocationController.getLocation = function (req, res, next) {
    res.json({error: "Not implemented", body: req.body});
};

LocationController.updateLocation = function (req, res, next) {
    res.json({error: "Not implemented", body: req.body});
};

LocationController.deleteLocation = function (req, res, next) {
    res.json({error: "Not implemented", body: req.body});
};

LocationController.getLocations = function (req, res, next) {
    res.json({error: "Not implemented", body: req.body});
};