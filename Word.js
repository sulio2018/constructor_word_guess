var Letter = require("./letter.js");

function Word(answer) {
    
    this.array = [];
    
    for (var i = 0; i < answer.length; i++) {
        var letter = new Letter(answer[i]);
        this.array.push(letter);
    }
    
    this.display = function () {
        answerLog = "";
        for (var i = 0; i < this.array.length; i++) {
            answerLog += this.array[i] + " ";
        }
        console.log(answerLog + "\n");
    }
    
    this.userGuess = function (input) {
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].guess(input);
        }
    }
}

module.exports = Word;

