'use strict';

var app = require('../..');
import request from 'supertest';

var newTimeseries;

describe('Timeseries API:', function() {
  describe('GET /api/timeseriess', function() {
    var timeseriess;

    beforeEach(function(done) {
      request(app)
        .get('/api/timeseriess')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          timeseriess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(timeseriess).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/timeseriess', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/timeseriess')
        .send({
          name: 'New Timeseries',
          info: 'This is the brand new timeseries!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTimeseries = res.body;
          done();
        });
    });

    it('should respond with the newly created timeseries', function() {
      expect(newTimeseries.name).to.equal('New Timeseries');
      expect(newTimeseries.info).to.equal('This is the brand new timeseries!!!');
    });
  });

  describe('GET /api/timeseriess/:id', function() {
    var timeseries;

    beforeEach(function(done) {
      request(app)
        .get(`/api/timeseriess/${newTimeseries._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          timeseries = res.body;
          done();
        });
    });

    afterEach(function() {
      timeseries = {};
    });

    it('should respond with the requested timeseries', function() {
      expect(timeseries.name).to.equal('New Timeseries');
      expect(timeseries.info).to.equal('This is the brand new timeseries!!!');
    });
  });

  describe('PUT /api/timeseriess/:id', function() {
    var updatedTimeseries;

    beforeEach(function(done) {
      request(app)
        .put(`/api/timeseriess/${newTimeseries._id}`)
        .send({
          name: 'Updated Timeseries',
          info: 'This is the updated timeseries!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTimeseries = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTimeseries = {};
    });

    it('should respond with the original timeseries', function() {
      expect(updatedTimeseries.name).to.equal('New Timeseries');
      expect(updatedTimeseries.info).to.equal('This is the brand new timeseries!!!');
    });

    it('should respond with the updated timeseries on a subsequent GET', function(done) {
      request(app)
        .get(`/api/timeseriess/${newTimeseries._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let timeseries = res.body;

          expect(timeseries.name).to.equal('Updated Timeseries');
          expect(timeseries.info).to.equal('This is the updated timeseries!!!');

          done();
        });
    });
  });

  describe('PATCH /api/timeseriess/:id', function() {
    var patchedTimeseries;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/timeseriess/${newTimeseries._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Timeseries' },
          { op: 'replace', path: '/info', value: 'This is the patched timeseries!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTimeseries = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTimeseries = {};
    });

    it('should respond with the patched timeseries', function() {
      expect(patchedTimeseries.name).to.equal('Patched Timeseries');
      expect(patchedTimeseries.info).to.equal('This is the patched timeseries!!!');
    });
  });

  describe('DELETE /api/timeseriess/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/timeseriess/${newTimeseries._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when timeseries does not exist', function(done) {
      request(app)
        .delete(`/api/timeseriess/${newTimeseries._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
