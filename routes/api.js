/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
const iex = require('iexcloud_api_wrapper');
const fetch = require("node-fetch");
const axios = require('axios')
require('dotenv').config()

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res) { 
  
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=flowersforAlgernon&key=${process.env.KEY}`)
        .then(function (response) {
          const title = response.data.items[0].volumeInfo.title
          const pDate = response.data.items[0].volumeInfo.publishedDate
          res.send(title + " was published on " + pDate)
        })      
        .catch(function (err) {
          console.log("Error is: " + err)
        })
       
  
    });

};

/* 
 
 axios.all([
    axios.get('http://google.com'),
    axios.get('http://apple.com')
  ])
  .then(axios.spread((googleRes, appleRes) => {
    // do something with both responses
  });
 
 */