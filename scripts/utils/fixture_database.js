"use strict";

var clients                 = require('../config/config.js').clients,
    dangerTypes             = require('../config/config.js').danger_types,
    OAuthClientOAuthModel   = require('../schemas/oauthClientSchema'),
    DangerTypeModel         = require('../models/dangerTypeModel'),
    User                    = require('../schemas/userSchema'),
    mongoose                = require('mongoose');

exports.loadOAuthClientFixture = function () {
    clients.forEach(function (client) {
        var clientDB = new OAuthClientOAuthModel({
            clientId: client.clientId,
            clientSecret: client.clientSecret
        });

        clientDB.save(function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Client %s added to database", client.clientName);
            }
        });
    });
};

exports.loadDangerTypeFixture = function () {
    dangerTypes.forEach(function (type) {

        DangerTypeModel.save(type.name, type.icon, function(err, type) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Danger Type %s added to database", type.name);
            }
        });
    });
};

exports.loadUserFixture = function() {
    var testUser = new User({
        username: 'test',
        password: 'password',
        email: 'test@test.com'
    });

    testUser.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("User test added to database");
        }
    });
};