const MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

var url = "mongodb://localhost:27017/BrainBuzzDB";

// Local configuration.
var listenPort = 5200;

var questionDatabase;
var activeQuestion;
var playerScore;

// Add headers
app.use(function (req, res, next) {

    // Websites you wish to allow to connect (all).
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Pass to next layer of middleware.
    next();
});

// For parsing urlencoded.
app.use(bodyParser.urlencoded({extended: true}));

// For parsing JSON.
app.use(bodyParser.json());

app.get("/getQuestion", function (req, res) {

  if (activeQuestion === null) {
    res.sendStatus(200);
    return;
  }

  res.send(activeQuestion.theQuestion);
});

app.post("/postAnswer", function (req, res) {

  if (activeQuestion === null) {
    res.sendStatus(200);
    return;
  }

  if (req.body.answer == activeQuestion.theAnswer) {
    playerScore += 10;
    res.send({isCorrect:true});
  }
  else {
    res.send({isCorrect:false});
  }
  prepareNextQuestion();
});

app.get("/getScore", function (req, res) {
  res.send({"playerScore": playerScore});
});

app.post("/startNewGame", function (req, res) {

  init(function(error) {

    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
});

app.listen(listenPort, function () {
  console.log("Brain Buzz server is listening on port: " + listenPort);
});

function init(callback) {

  MongoClient.connect(url, function(err, db) {

    if (err) {
      callback(err);
      return;
    }

    db.collection("Questions").find({}).toArray(function(err, result) {

      if (err) {
        callback(err);
        return;
      }

      questionDatabase = result;

      db.close();

      console.log(questionDatabase);
      prepareNextQuestion();
      playerScore = 0;

      callback(null);
    });
  });
}

function prepareNextQuestion() {

  // Work only when the database has questions left in it.
  if (questionDatabase.length === 0) {
    activeQuestion = null;
    return;
  }

  // Select the next question.
  var activeQuestionIndex = Math.floor(Math.random() * questionDatabase.length);

  // Copy the content of the next question.
  activeQuestion =  questionDatabase[activeQuestionIndex];

  // Remove the selected question from this session's database.
  questionDatabase.splice(activeQuestionIndex, 1);
}

init(function(error) {

  if (error) {
    console.log(error);
    return;
  }
});
