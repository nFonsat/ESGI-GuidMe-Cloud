"use strict";

module.exports = function (app) {
    app.all('/oauth/token', app.oauth.grant());
}