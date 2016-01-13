"use strict";

var clients             = require('../config/config.js').clients,
    dangerTypes         = require('../config/config.js').danger_types,
    OAuthClientModel    = require('../models/oauthModel'),
    DangerTypeModel     = require('../models/dangerTypeModel'),
    UserModel           = require('../models/userModel'),
    mongoose            = require('mongoose');

exports.loadOAuthClientFixture = function () {
    clients.forEach(function (client) {
        OAuthClientModel.saveClient(client.clientId, client.clientSecret, 
            function(err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Client %s added to database", client.clientName);
                }
            }
        );
    });
};

exports.loadDangerTypeFixture = function () {
    dangerTypes.forEach(function (type) {

        DangerTypeModel.save(type.name, type.icon, 
            function(err, type) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Danger Type %s added to database", type.name);
                }
            }
        );
    });
};

exports.loadUserFixture = function() {
    var username    = 'test',
        email       = 'test@test.com',
        password    = 'password';

    UserModel.save(username, email, password,
        function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("User %s added to database", result.username);
            }
        }
    );
};