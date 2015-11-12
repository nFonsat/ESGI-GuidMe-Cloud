 "use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OAuthClientSchema = new Schema({
    clientId: { 
        type: String
    },
    clientSecret: {
        type: String
    },
    redirectUri: { 
        type: String
    }
});

module.exports = mongoose.model('OAuthRefreshToken', OAuthRefreshTokensSchema);