var express = require('express');
var app = express();
var request = require('request');

// usage
//
// app.use('/db', forward('http://localhost:5984'));
//
module.exports = function(host) {
  return function(req, res, next) {
    var db_url = host + req.url;
    req.pipe(request[req.method.toLowerCase()](db_url)).pipe(res);
  };
};
