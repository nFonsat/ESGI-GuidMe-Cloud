"use strict";

var DangerController  = module.exports,
    DangerModel       = require('../models/dangerModel');

DangerController.postDanger = function (req, res, next) {
    console.log("--DangerController postDanger");

    var name        = req.body.name,
        typeId      = req.body.typeId,
        latitude    = req.body.latitude
        longitude   = req.body.longitude,
        userId      = req.user.id;

    if ( !name || !typeId || !latitude || !longitude ){
        res.status(500).json({ error: 'Check body parameter' });
    }
    else {
        DangerModel.save(name, typeId, userId, latitude, longitude, 
            function(err, dataSaving) {
                if (err) {
                    console.log("postDanger Error : %s", err)
                    res.status(500).send({error: "Bad mongoose query"});
                }
                else {
                    DangerModel.findById(dataSaving.id, function(err, data) {
                        if (err) {
                            res.status(500).send(err);
                        }
                        else {
                            res.json(data);
                        }
                    });
                }
            }
        );
    }
};

DangerController.getDanger = function (req, res, next) {
    console.log("--DangerController getDanger");

    var dangerId = req.params.dangerId;

    if ( !dangerId ){
        res.status(500).json({ error: 'assign danger id in url' });
    }
    else {
        DangerModel.findById(dangerId, function(err, data) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(data);
            }
        });
    }
};

DangerController.updateDanger = function (req, res, next) {
    console.log("--DangerController updateDanger");

    var newName     = req.body.name,
        newType     = req.body.typeId,
        userId      = req.user.id,
        dangerId    = req.params.dangerId;

    if ( !dangerId ){
        res.status(500).json({ error: 'Check parameter' });
    }
    else if ( !newName || !newType ){
        res.status(500).json({ error: 'Check body parameter' });
    }
    else {
        DangerModel.update(dangerId, userId, newName, newType, 
            function(err, dataUpdated) {
                if (err) {
                    console.log("updateDanger Error : %s", err)
                    res.status(500).send({error: "Bad mongoose query"});
                }
                else {
                    DangerModel.findById(dataSaving.id, function(err, data) {
                        if (err) {
                            res.status(500).send(err);
                        }
                        else {
                            res.json(data);
                        }
                    });
                }
            }
        );
    }
};

DangerController.deleteDanger = function (req, res, next) {
    console.log("--DangerController deleteDanger");

    var dangerId    = req.params.dangerId,
        userId      = req.user.id;

    if ( !dangerId ){
        res.status(500).json({ error: 'assign danger id in url' });
    }
    else {
        DangerModel.delete(dangerId, userId, 
            function(err, data) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json({data: data, deleted: true});
                }
            }
        );
    }
};

DangerController.getDangers = function (req, res, next) {
    console.log("--DangerController deleteDanger");

    var latitude    = req.query.latitude,
        longitude   = req.query.longitude,
        distance    = req.query.distance,
        limitData   = req.query.limit;

    if ( !latitude || !longitude ){
        DangerModel.findAll(function(err, results) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(results);
            }
        });
    }
    else {
        DangerModel.findByDistanceToPoint(latitude, longitude, distance, limitData,
            function(err, results){
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(results);
                }
            }
        );
    }
};