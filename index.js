var express = require('express');
var app = express();
var request = require('request');

module.exports = function(pattern, host, auth) {
  return function(req, res, next) {
    // if no auth method proceed, if auth method test
    if (!auth || auth(req)) {
      var db_path = req.url.match(pattern)[1]
        , db_url = [host, db_path].join('/');
      // request pipeline...
      req.pipe(request[req.method.toLowerCase()](db_url)).pipe(res);
    } else {
      // unauthorized
      res.send(401);
    }
  };
};
