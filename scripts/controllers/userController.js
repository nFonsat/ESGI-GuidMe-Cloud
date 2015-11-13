"use strict";

module.exports = function (app) {
    var bodyParser  = require('body-parser');
    var User = require('../schemas/userSchema');

    app.post('/api/v1/user', function(req, res) {
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