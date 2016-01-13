"use strict";

module.exports = function (app) {
    var apiBaseUrl              = require('../config/config').api.base_url,
        CloudController         = require('../controllers/cloudController'),
        UserController          = require('../controllers/userController'),
        LocationController      = require('../controllers/locationController'),
        DangerController        = require('../controllers/dangerController');

    app.all('/oauth/token', app.oauth.grant());

    app.get('/', CloudController.home);

    var apiUser = apiBaseUrl + '/user';
    app.post(apiUser, UserController.createUser);
    app.get(apiUser, app.oauth.authorise(), UserController.getUser);
    app.get(apiUser + '/all', UserController.userList);

    var apiLocation = apiBaseUrl + '/location';
    app.get(apiLocation + '/all', app.oauth.authorise(), LocationController.getLocations);
    app.post(apiLocation, app.oauth.authorise(), LocationController.postLocation);
    app.get(apiLocation + '/:locationId', app.oauth.authorise(), LocationController.getLocation);
    app.put(apiLocation + '/:locationId', app.oauth.authorise(), LocationController.updateLocation);
    app.delete(apiLocation + '/:locationId', app.oauth.authorise(), LocationController.deleteLocation);
    app.post(apiLocation + '/play/:locationId', app.oauth.authorise(), LocationController.playLocation);
    app.post(apiLocation + '/favorite/:locationId', app.oauth.authorise(), LocationController.postFavorite);
    app.delete(apiLocation + '/favorite/:locationId', app.oauth.authorise(), LocationController.deleteFavorite);

    var apiDanger = apiBaseUrl + '/danger';
    app.get(apiDanger + '/all', DangerController.getDangers);
    app.post(apiDanger, app.oauth.authorise(), DangerController.postDanger);
    app.get(apiDanger + '/:dangerId', DangerController.getDanger);
    app.put(apiDanger + '/:dangerId', app.oauth.authorise(), DangerController.updateDanger);
    app.delete(apiDanger + '/:dangerId', app.oauth.authorise(), DangerController.deleteDanger);
}