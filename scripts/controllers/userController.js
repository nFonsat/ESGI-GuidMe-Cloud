"use strict";

var UserController  = module.exports,
    UserModel       = require('../models/userModel');

UserController.createUser = function(req, res) {
    if (!req.body){
        return res.sendStatus(500);
    }

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    if (username && email && password) {
        UserModel.saveUser(username, email, password, function(err, user) {
            if (err){
                return res.status(500).send(err);
            }

            res.json({ success: true, user: user });
        });
    }
    else {
        res.status(400).json({ error: 'Check body parameter' });
    }
};

UserController.userList = function (req, res, next) {
    UserModel.findUsers(function(err, users) {
        if (err){
            return res.status(500).send(err);
        }
            
        res.json(users);
    });
};

UserController.getUser = function (req, res, next) {
    UserModel.findUserById(req.user.id, function(err, user) {
        if (err) {
            return res.status(500).send(err);
        };

        res.json(user);
    });
};