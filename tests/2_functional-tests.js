/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

  suite('GET /api/stock-prices => stockData object', function () {

    test('1 stock', function (done) {
      chai.request(server)
        .get('/api/stock-prices')
        .query({ singleBook: 'goog' })
        .end(function (err, res) {

          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(req.query.singleBook, 'goog', 'input request should be "goog"');

          done();

        });
    });

    test('1 stock with like', function (done) {
      chai.request(server)
       .get('/api/stock-prices')
        .query({ req.query.like: 'true' })
        .end(function (err, res) {

          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(req.query.like, 'true', 'like checkbox request should be "true"');

          done();

        });
    });

    test('1 stock with like again (ensure likes arent double counted)', function (done) {
      chai.request(server)
        .get('/api/stock-prices')
        .query({ req.query.like: 'true' })
        .end(function (err, res) {

          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(req.query.like, 'true', 'like checkbox request should be "true"');

          done();

        });
    });

    test('2 stocks', function (done) {
      chai.request(server)
        .get('/api/mulit-stock-prices')
        .query({ bookOne: 'goog', bookTwo: 'FB'  })
        .end(function (err, res) {

          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(req.query.bookOne, 'goog', 'first input request should be "goog"');
          assert.equal(req.query.bookTwo, 'FB', 'second input request should be "FB"');

          done();

        });
    });

    test('2 stocks with like', function (done) {
      chai.request(server)
        .get('/api/mulit-stock-prices')
        .query({
          bookOne: 'goog',
          bookTwo: 'FB',
          req.query.likeBoth: 'true'
        })

        .end(function (err, res) {

          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(req.query.bookOne, 'goog', 'first input request should be "goog"');
          assert.equal(req.query.bookTwo, 'FB', 'second input request should be "FB"');
          assert.equal(req.query.likeBoth, 'true', 'likeBoth checkbox request should be "true"');

          done();

        });
    });

  });

});
