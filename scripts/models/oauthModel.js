"use strict";

var OAuthModel              = module.exports,
    OAuthAccessTokenSchema  = require('../schemas/oauthAccessTokenSchema'),
    OAuthRefreshTokenSchema = require('../schemas/oauthRefreshTokenSchema'),
    OAuthClientSchema       = require('../schemas/oauthClientSchema'),
    UserSchema              = require('../schemas/userSchema'),
    SHA512                  = require("crypto-js/sha512");


OAuthModel.getAccessToken = function (bearerToken, callback) {
  console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

  OAuthAccessTokenSchema.findOne({ accessToken: bearerToken }, callback);
};

OAuthModel.getClient = function (clientId, clientSecret, callback) {
  console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');

  OAuthClientSchema.findOne({ clientId: clientId, clientSecret: clientSecret }, callback);
};

OAuthModel.grantTypeAllowed = function (clientId, grantType, callback) {
  console.log('in grantTypeAllowed (clientId: ' + clientId + ', grantType: ' + grantType + ')');
  callback(false, true);
};

OAuthModel.saveAccessToken = function (token, clientId, expires, userId, callback) {
  userId = (typeof(userId) === "object") ? userId.id : userId;
  console.log('in saveAccessToken (token: ' + token + ', clientId: ' + clientId + ', userId: ' + userId + ', expires: ' + expires + ')');

  var accessToken = new OAuthAccessTokenSchema({
    accessToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  accessToken.save(callback);
};

/*
 * Required to support password grant type
 */
OAuthModel.getUser = function (username, password, callback) {
  console.log('in getUser (username: ' + username + ', password: ' + password + ')');

  var hashPassword = SHA512(password);
  UserSchema.findOne({ username: username, password: hashPassword.toString() }, function(err, user) {
    if(err) {
        console.log("Error getUser : %s", err);
        return callback(err);
    } 
    console.log(user);
    callback(null, user.id);
  });
};

/*
 * Required to support refreshToken grant type
 */
OAuthModel.saveRefreshToken = function (token, clientId, expires, userId, callback) {
  userId = (typeof(userId) === "object") ? userId.id : userId;
  console.log('in saveRefreshToken (token: ' + token + ', clientId: ' + clientId +', userId: ' + userId + ', expires: ' + expires + ')');

  var refreshToken = new OAuthRefreshTokenSchema({
    refreshToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  refreshToken.save(callback);
};

OAuthModel.getRefreshToken = function (refreshToken, callback) {
  console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');

  OAuthRefreshTokenSchema.findOne({ refreshToken: refreshToken }, callback);
};