 "use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OAuthClientSchema = new Schema({
    clientId: { 
        type: String,
        unique: true
    },
    clientSecret: {
        type: String
    }
});

module.exports = mongoose.model('OAuthClient', OAuthClientSchema);