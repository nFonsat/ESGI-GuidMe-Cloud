"use strict";

var UserModel   = module.exports,
    OAuthModel  = require('./oauthModel'),
    userSchema  = require('../schemas/userSchema');

UserModel.saveUser = function(username, email, password, callback) {
    var user = new userSchema({
        username: username,  
        email: email,
        password: password
    });

    user.save(callback);
};

UserModel.findUsers = function(callback) {
    userSchema.find({}, callback);
};

UserModel.findUserWithToken = function (token, callback) {
    OAuthModel.getAccessToken(token, function(err, accessToken) {
        if (err) {
            console.log(err);
            OAuthModel.getRefreshToken(token, function(err, refreshToken) {
                if (err) {
                    console.log(err);
                }
                else {
                    console("Success Refresh Token");
                    callback(refreshToken);
                }
            });
        }
        else {
            console("Success Access Token");
            callback(accessToken);
        }
    });
}