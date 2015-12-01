"use strict";
var clients                 = require('../config/config.js').clients,
    OAuthClientOAuthModel   = require('../schemas/oauthClientSchema'),
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
                throw err;
            }

            console.log("Client %s added to database", client.clientName);
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
            throw err;
        }

        console.log("User test added to database");
    });
};