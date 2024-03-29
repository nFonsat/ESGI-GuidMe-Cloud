 "use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OAuthRefreshTokenSchema = new Schema({
    refreshToken: {
        type: String
    },
    clientId: {
        type: String
    },
    userId: {
        type: String
    },
    expires: {
        type: Date
    }
});

module.exports = mongoose.model('OAuthRefreshToken', OAuthRefreshTokenSchema);