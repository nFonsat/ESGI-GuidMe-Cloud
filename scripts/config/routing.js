"use strict";

module.exports = function (app) {
    var apiBaseUrl = require('../config/config').api.base_url,
        CloudController = require('../controllers/cloudController'),
        UserController = require('../controllers/userController'); 

    app.all('/oauth/token', app.oauth.grant());

    app.get('/', CloudController.home);

    var apiUser = apiBaseUrl + '/user';
    app.post(apiUser, UserController.createUser);
    app.get(apiUser, UserController.getUser);
    app.get(apiUser + '/all', UserController.userList);
}