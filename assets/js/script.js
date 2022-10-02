var startBtn = document.querySelector("#start-game");
var wordDisplayH2 = document.querySelector("#word-display")
var timeLeftspan = document.querySelector("#time-left")
var winsSpan = document.querySelector("#wins")
var lossesSpan = document.querySelector("#losses")
var resetBtn = document.querySelector("#reset-scores")

var wordsArr = ['abstract', 'arguments',	'await', 'boolean',
    'break','byte','case','catch',
    'char',	'class',	'const',	'continue',
    'debugger',	'default',	'delete',	'do',
    'double',	'else',	'enum',	'eval',
    'export',	'extends',	'false',	'final',
    'finally',	'float',	'for',	'function',
    'goto',	'if',	'implements',	'import',
    'in',	'instanceof',	'int',	'interface',
    'let',	'long',	'native',	'new',
    'null',	'package',	'private',	'protected',
    'public',	'return',	'short',	'static',
    'super',	'switch',	'synchronized',	'this',
    'throw',	'throws',	'transient',	'true',
    'tr',	'typeof',	'var',	'void',
    'volatile',	'while',	'with',	'yield']
    var chosenWord;
    var chosenWordArr;
    var guesses = []
    var isPlaying = false
    var timer;
    var timeLeft = 10;
    var wins = localStorage.getItem("wins") ||0;
    var losses = localStorage.getItem("losses") ||0;

    winsSpan.textContent = wins;
    lossesSpan.textContent = losses;



    startBtn.addEventListener("click", function(){
        if (isPlaying) {
            return;
        }
        console.log("game started!")
        isPlaying = true;
        timeLeft = 10;
        clearInterval(timer);
        timer = setInterval(function () {
            timeLeft--;
            timeLeftspan.textContent=timeLeft;
            if (timeLeft === 0) {
                clearInterval(timer);
                isPlaying = false;
                losses++;
                localStorage.setItem("losses", losses)
                lossesSpan.textContent = losses;
                alert ("you lose!");
            }
        },1000)

        chosenWord = wordsArr[Math.floor(Math.random()*wordsArr.length)];
        chosenWordArr = chosenWord.split("");
        console.log(chosenWord, chosenWordArr);
        guesses = []
        for (let i = 0; i < chosenWordArr.length; i++) {
            guesses.push("_")
        }
        wordDisplayH2.textContent = guesses.join(" ")
    });

    document.addEventListener("keyup", function(event) {
        if (isPlaying) {
            var keyPressed = event.key;
            console.log(keyPressed)

        if (chosenWordArr.includes(keyPressed)) {
            console.log("its in the word!");
            for (let i = 0; i < chosenWordArr.length; i++) {
                if (chosenWordArr[i] === keyPressed) {
                    guesses[i] = keyPressed;
                }
            }       
        console.log(guesses);
        wordDisplayH2.textContent = guesses.join(" ");
        console.log(chosenWord, guesses.join(""));
        if (chosenWord === guesses.join("")) {
            alert("you win!")
            isPlaying = false;
            clearInterval(timer);
            wins++;
            localStorage.setItem("wins", wins);
            winsSpan.textContent = wins;
        }
     }
    }
});

resetBtn.addEventListener("click", function () {
    wins = 0;
    losses = 0;
    localStorage.setItem("wins", wins);
    localStorage.setItem("losses", losses);
    winsSpan.textContent = wins;
    lossesSpan.textContent = losses;
})
 

            



