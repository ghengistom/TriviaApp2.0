'use strict';

var express = require('express');
var Question = require('../models/question');

var router = express.Router();

//Returns a single trivia question:
/* { "question": "Who was the first computer programmer?",
    "answerId": 1 }
*/
router.get('/question', function(req, res) {

  Question.count().exec(function (err, count) {
    // Get a random entry
    var random = Math.floor(Math.random() * count)

    Question.findOne().skip(random).exec(
      function(err, questions){

      if(err) {
        return res.status(500).json({message: err.message});
      }

      res.json(questions);
    });
  });
});

//Creates a new trivia question:
/*{ "question": "Who led software development for NASA's Apollo missions?",
  "answer": "Margaret Hamilton" }
}*/
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
