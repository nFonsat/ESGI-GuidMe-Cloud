"use strict";

var CloudController = module.exports;

CloudController.home = function (req, res) {
    console.log(res);
    res.send('Hello!');
};