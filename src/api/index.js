'use strict';

var express = require('express');
var Question = require('../models/question');

var router = express.Router();

//receive get from browser at this url
router.get('/question', function(req, res) {
  Question.findOne({}, function(err, questions){
    if(err) {
      return res.status(500).json({message: err.message});
    }
    console.log("Code Before .cout() method");
    // Get the count of all users
    Question.count().exec(function (err, count) {
      // Get a random entry
      var random = Math.floor(Math.random() * count)
      // Again query all users but only fetch one offset by our random #
      Question.findOne().skip(random).exec(
        function (err, result) {
          // Tada! random user
          console.log(result)
        })
    })

    res.json(questions);
  });
});

/*
// Get the count of all users
User.count().exec(function (err, count) {

  // Get a random entry
  var random = Math.floor(Math.random() * count)

  // Again query all users but only fetch one offset by our random #
  User.findOne().skip(random).exec(
    function (err, result) {
      // Tada! random user
      console.log(result)
    })
})

*/











//receive post from browser at this url
router.post('/question', function(req, res) {
  var question = req.body;
  Question.create(question, function(err, question){
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({'question' : question, message: 'Question Created'});
  });
});

router.put('/questions/:id', function(req, res) {
  var id = req.params.id;
  var question = req.body;

  if (question && question._id !== id ) {
    return res.status(500).json({ err: "Ids don't match!"})
  }

  Question.findByIdAndUpdate(id, question, { new: true }, function(err, question){
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({'question' : question, message: 'Question Updated'});
  });
});

// TODO : Add a DELETE route to delete entries

module.exports = router;
