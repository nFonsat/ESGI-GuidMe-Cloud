"use strict";

module.exports = function (app) {
    var SHA512 = require("crypto-js/sha512");
    var bodyParser  = require('body-parser');
    var User = require('../models/user');

    var urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.post('/api/v1/user', urlencodedParser, function(req, res) {
        if (!req.body) return res.sendStatus(400);

        var email = req.body.email;
        var password = req.body.password;

        console.log('Email : %s \nPassword : %s', email, password);
        if (email && password) {
            var person = new User({ 
                email: email, 
                password: SHA512(password)
            });

            console.log("User => %s", person);

            person.save(function(err) {
                if (err){
                    console.log(err);
                    throw err;
                }

                console.log('User saved successfully');
                res.json({ success: true });
            });
        }
        else {
            res.status(400).json({ error: 'Check body parameter' });
        }
    });

    app.get('/api/v1/users', function (req, res, next) {
        User.find({}, function(err, users) {
            if (err){
                console.log(err);
                throw err;
            }
                
            res.json(users);
        });
    });
}