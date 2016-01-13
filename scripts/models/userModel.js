"use strict";

var UserModel   = module.exports,
    UserSchema  = require('../schemas/userSchema');

UserModel.save = function(username, email, password, callback) {
    var user = new UserSchema({
        username: username,  
        email: email,
        password: password
    });

    UserModel.findOneByUsernameOrEmail(username, email, 
        function(err, result){
            if (err) {
                callback(err);
            }
            else if (result) {
                var error = "User " + result.username + " already exists";
                callback(error);
            }
            else {
                user.save(function(err, result) {
                    if (err){
                        callback(err);
                    }
                    else {
                        UserModel.findById(result.id, callback);
                    }
                });
            }
        }
    );
};

UserModel.findAll = function(callback) {
    UserSchema.find({}, callback);
};

UserModel.findById = function (userId, callback) {
    UserSchema.findById(userId, callback);
}

UserModel.findOneByUsernameOrEmail = function(username, email, callback) {
    UserSchema.findOne( { $or: [ { username: username }, { email: email } ] }, 
        function(err, result){
            if (err){
                callback(err);
            }
            else {
                callback(null, result);
            }
        }
    );
};