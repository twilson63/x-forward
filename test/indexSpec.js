var request = require('supertest');
var express = require('express');
var nock = require('nock');

//nock.recorder.rec();
nock('http://localhost:5984')
  .get('/foo')
  .twice()
  .reply(200, { hello: "world"});

var forward = require('../');

describe('forward', function() {
  describe('with auth', function() {
    it('should redirect /db/foo', function(done) {
      var app = express();
      app.use(forward(/\/db\/(.*)/, 'http://localhost:5984', function () {
        return true;
      }));

      request(app)
        .get('/db/foo')
        .set('Accept', 'application/json')
        .expect(200, {hello: 'world'}, done);
    });
    it('should not redirect /db/bar', function(done) {
      var app = express();
      app.use(forward(/\/db\/(.*)/, 'http://localhost:5984', function () {
        return false;
      }));

      request(app)
        .get('/db/foo')
        .set('Accept', 'application/json')
        .expect(401, done);
    });
  });
  describe('without auth', function() {
    it('should redirect /db/foo', function(done) {
      var app = express();
      app.use(forward(/\/db\/(.*)/, 'http://localhost:5984'));

      request(app)
        .get('/db/foo')
        .set('Accept', 'application/json')
        .expect(200, {hello: 'world'}, done);
    });
  });  
})

