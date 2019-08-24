var Word = require("./word.js");
var inquirer = require("inquirer");

// Set up variables
var letterArray = "abcdefghijklmnopqrstuvwxyz";

var teams = ["dodgers", "yankees", "astros", "cardinals", "diamondbacks", "giants", "twins", "rockies", "marlins", "braves"];

var randomIndex = Math.floor(Math.random() * teams.length);
var randomWord = teams[randomIndex];

var wordGenerate = new Word(randomWord);

var getWord = false;

var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 6;
