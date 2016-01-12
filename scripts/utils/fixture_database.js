"use strict";

var clients                 = require('../config/config.js').clients,
    dangerTypes             = require('../config/config.js').danger_types,
    OAuthClientOAuthModel   = require('../schemas/oauthClientSchema'),
    DangerTypeModel         = require('../models/dangerTypeModel'),
    UserModel               = require('../models/userModel'),
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
    UserModel.save('test', 'password', 'test@test.com', 
        function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("User " + result.username + " added to database");
            }
        }
    );
};