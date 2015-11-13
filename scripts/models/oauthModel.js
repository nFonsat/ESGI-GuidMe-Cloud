"use strict";

var OAuthModel = module.exports,
    OAuthAccessTokenOAuthModel  = require('../schemas/oauthAccessTokenSchema'),
    OAuthRefreshTokenOAuthModel = require('../schemas/oauthRefreshTokenSchema'),
    OAuthClientOAuthModel       = require('../schemas/oauthClientSchema'),
    UserOAuthModel              = require('../schemas/userSchema');


OAuthModel.getAccessToken = function (bearerToken, callback) {
  console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

  OAuthAccessTokenOAuthModel.findOne({ accessToken: bearerToken }, callback);
};

OAuthModel.getClient = function (clientId, clientSecret, callback) {
  console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');

  OAuthClientOAuthModel.findOne({ clientId: clientId, clientSecret: clientSecret }, callback);
};

OAuthModel.grantTypeAllowed = function (clientId, grantType, callback) {
  console.log('in grantTypeAllowed (clientId: ' + clientId + ', grantType: ' + grantType + ')');
  callback(false, true);
};

OAuthModel.saveAccessToken = function (token, clientId, expires, userId, callback) {
  console.log('in saveAccessToken (token: ' + token + ', clientId: ' + clientId + ', userId: ' + userId + ', expires: ' + expires + ')');

  var accessToken = new OAuthAccessTokenOAuthModel({
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

  UserOAuthModel.findOne({ username: username, password: password }, function(err, user) {
    if(err) return callback(err);
    callback(null, user._id);
  });
};

/*
 * Required to support refreshToken grant type
 */
OAuthModel.saveRefreshToken = function (token, clientId, expires, userId, callback) {
  console.log('in saveRefreshToken (token: ' + token + ', clientId: ' + clientId +', userId: ' + userId + ', expires: ' + expires + ')');

  var refreshToken = new OAuthRefreshTokenOAuthModel({
    refreshToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  refreshToken.save(callback);
};

OAuthModel.getRefreshToken = function (refreshToken, callback) {
  console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');

  OAuthRefreshTokenOAuthModel.findOne({ refreshToken: refreshToken }, callback);
};