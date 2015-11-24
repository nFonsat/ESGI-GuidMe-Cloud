"use strict";

var UserModel   = module.exports,
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

UserModel.findUserById = function (userId, callback) {
    userSchema.findById(userId, callback);
}