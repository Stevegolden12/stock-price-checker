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
const axios = require('axios')
require('dotenv').config()


const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res) {
      let like = "I enjoyed the book and would recommend it.";
      console.log("req.query.searchTitle: " + req.query.singleBook)
      if (req.query.like === undefined) {
        like = "";
      }
      console.log("like: "+ like)
      const searchTitle = req.query.singleBook;
      console.log("searchTitle: " + searchTitle)
      console.log(`https://www.googleapis.com/books/v1/volumes?q=${searchTitle}&key=${process.env.KEY}`)
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTitle}&key=${process.env.KEY}`)
          .then(function (response) {
          const title = response.data.items[0].volumeInfo.title
          const pDate = response.data.items[0].volumeInfo.publishedDate
            res.send(title + " written by " + response.data.items[0].volumeInfo.authors[0] + " and was published on " + pDate + ".<br><br>" + like)
        })      
        .catch(function (err) {
          console.log("Error is: " + err)
     
        })
       
  
    });

  app.route('/api/multi-stock-prices')
    .get(function (req, res) {
     
      let likeBoth = "and I recommend both books.";    
      if (req.query.likeBoth === undefined) {
        likeBoth = "";
      }
      console.log("likeBoth: " + likeBoth)
      const searchTitleOne = req.query.bookOne;
      const searchTitleTwo = req.query.bookTwo;

      console.log("searchTitleOne: " + searchTitleOne);
      console.log(searchTitleTwo)

      function getBookOne() {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTitleOne}&key=${process.env.KEY}`);
      }

      function getBookTwo() {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTitleTwo}&key=${process.env.KEY}`);
      }


      axios.all([getBookOne(), getBookTwo()])
        .then(axios.spread(function (bookOneRes, bookTwoRes) {
          // do something with both responses
          const titleOne = bookOneRes.data.items[0].volumeInfo.title
          const pDateOne = bookOneRes.data.items[0].volumeInfo.publishedDate
          const titleTwo = bookTwoRes.data.items[0].volumeInfo.title
          const pDateTwo = bookTwoRes.data.items[0].volumeInfo.publishedDate

          const dateOne = parseInt(pDateOne.substring(0, 4));
          const dateTwo = parseInt(pDateTwo.substring(0, 4));
          const diffDate = Math.abs(dateOne - dateTwo)
          console.log(diffDate);

          res.send("Between \"" + titleOne + "\" and the second book \"" + titleTwo + "\" there is " + diffDate + " year(s) published difference " + likeBoth)
        })) 
        .catch(function (err) {
          console.log("Error is: " + err)
        })



    })

};
