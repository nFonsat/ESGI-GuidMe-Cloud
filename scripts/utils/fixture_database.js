"use strict";

exports.loadOAuthClientFixture = function () {
    var clients                 = require('../config/config.js').clients,
        OAuthClientOAuthModel   = require('../schemas/oauthClientSchema'),
        mongoose                = require('mongoose');

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