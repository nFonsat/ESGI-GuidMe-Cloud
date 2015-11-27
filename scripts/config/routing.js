"use strict";

module.exports = function (app) {
    var apiBaseUrl              = require('../config/config').api.base_url,
        CloudController         = require('../controllers/cloudController'),
        UserController          = require('../controllers/userController'),
        LocationController    = require('../controllers/locationController');

    app.all('/oauth/token', app.oauth.grant());

    app.get('/', CloudController.home);

    var apiUser = apiBaseUrl + '/user';
    app.post(apiUser, UserController.createUser);
    app.get(apiUser, app.oauth.authorise(), UserController.getUser);
    app.get(apiUser + '/all', UserController.userList);

    var apiLocation = apiBaseUrl + '/location';
    app.post(apiLocation, app.oauth.authorise(), LocationController.postLocation);
    app.get(apiLocation, app.oauth.authorise(), LocationController.getLocation);
    app.put(apiLocation, app.oauth.authorise(), LocationController.updateLocation);
    app.delete(apiLocation, app.oauth.authorise(), LocationController.deleteLocation);
    app.get(apiLocation + '/all', app.oauth.authorise(), LocationController.getLocations);
}