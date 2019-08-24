var Word = require("./word.js");
var inquirer = require("inquirer");
var colors = require("colors");

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

// Start the game

console.log("--------------------\n")
console.log("Guess MLB team names:\n".bold.blue)

function startGame() {
    
    if (getWord) {

        randomIndex = Math.floor(Math.random() * teams.length);
        randomWord = teams[randomIndex];
             
        wordGenerate = new Word(randomWord);
      
        getWord = false;
    }

    var wordComplete = [];
    wordGenerate.array.forEach(completeCheck);

    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter and press Enter:",
                    name: "userinput"
                }
            ])
            .then(function (input) {

                if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                    console.log("\nOnly input one letter at a time.\n");
                    startGame();
                } else {

                    if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                        console.log("\nLetter already guessed or no letter provided.\n");
                        startGame();
                    } else {

                        var wordCheckArray = [];

                        wordGenerate.userGuess(input.userinput);

                        wordGenerate.array.forEach(wordCheck);
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log("\nIncorrect! Keep trying..\n".red);
                          
                            incorrectLetters.push(input.userinput);
                            guessesLeft--;

                        } else {
                            console.log("\nCorrect! Keep going..\n".green);
                            
                            correctLetters.push(input.userinput);
                        }

                        wordGenerate.display();

                        console.log("Guesses Left: ".bold + guessesLeft + "\n");

                        console.log("Letters Guessed: ".bold + incorrectLetters.join(" ") + "\n");

                        if (guessesLeft > 1) {

                            startGame();

                        } else {
                            console.log("You have 0 guesses left. Better luck next time!\n");
                            console.log("The correct word was: " + randomWord + ".\n");

                            restartGame();
                        }

                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log("CONGRATS! You guessed correctly.\n".bold.cyan);

        restartGame();
    }

    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "confirm",
                name: "restart",
                message: "Would you like to play again?".bold

            }
            
        ])
        .then(function (confirm) {
            if (confirm.restart === true) {
                getWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 6;
 
                console.log("\n")

                startGame();
                
            } else {
                return  console.log("\nYou're OUT!".bold.cyan);
    
            }
        })
}

startGame();

