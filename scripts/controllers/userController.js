"use strict";

var UserController = module.exports;

var User = require('../schemas/userSchema');

UserController.createUser = function(req, res) {
    if (!req.body) return res.sendStatus(400);

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    if (email && password && username) {
        var person = new User({
            username: username,  
            email: email,
            password: password
        });

        person.save(function(err) {
            if (err){
                console.log(err);
                throw err;
            }

            console.log('User saved successfully');
            res.json({ success: true, user: person });
        });
    }
    else {
        res.status(400).json({ error: 'Check body parameter' });
    }
};

UserController.userList = function (req, res, next) {
    User.find({}, function(err, users) {
        if (err){
            console.log(err);
            throw err;
        }
            
        res.json(users);
    });
};



UserController.getUser = function (req, res, next) {
    res.json({});
};