// all the variables
const duration = document.getElementById("duration");
const startBtn = document.getElementById("start-btn");
let counter = document.getElementById("counter");
const resultDiv = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");
const winnerFound = document.getElementById("winner");
const winningMsg = document.getElementById("winningMsg");
const playerLeft = document.getElementById("player-left");
let scoreLeft = 0;
const playerRight = document.getElementById("player-right");
let scoreRight = 0;

// make the divs clickable by adding tabindex
function beginningState() {
    startBtn.disabled = false;
    scoreLeft = scoreRight = 0;
    resultDiv.style.backgroundColor = "transparent";
    restartBtn.style.display = "none";
    winnerFound.innerHTML = winningMsg.innerHTML = "";
    counter.innerHTML = "--";
    duration.value = "";
    document.getElementById("score-player-left").innerHTML = "";
    document.getElementById("score-player-right").innerHTML = "";
}
function gameFinished() {
    clearInterval(startInterval);
    document.removeEventListener("keydown", updateScore);
    resultDiv.style.backgroundColor = "tan";
    if(scoreLeft === 0 && scoreRight === 0) {
        winningMsg.innerHTML = "Have you paid attention? You need to press a key, either 'l' or 's'.";
    } else {
        const score = `Left-score: ${scoreLeft} & Right-score: ${scoreRight}.`;
        const winner = (scoreLeft < scoreRight) ? "Right" : (scoreLeft > scoreRight) ? "Left" : null;
        winnerFound.innerHTML = (winner !== null) ? `The winner is: ${winner}.` : "It's a draw!!!";;
        winningMsg.innerHTML = score;
    }
}

window.addEventListener("load", beginningState);
restartBtn.addEventListener("click", beginningState);
// game started...
let startInterval;
function startTheGame() {
    if(duration.value === "") {
        alert("Please enter the game duration first to start...");
    } else {
        document.addEventListener("keydown", updateScore);
        const gameDuration = parseInt(duration.value);
        startBtn.disabled = true;
        counter.innerHTML = (gameDuration < 10) ? ("0" + gameDuration) : gameDuration;
        let count = gameDuration;     
        startInterval = setInterval(function(){
            count--;   
            counter.innerHTML = (count < 10) ? ("0" + count) : count;            
        }, 1000);
        setTimeout(function() {  
            gameFinished(); 
            restartBtn.style.display = "block";
        }, (gameDuration * 1000));
    }
};
startBtn.addEventListener("click", startTheGame);
// updates the scores
function updateScore(event) {
    if((event.key === "s") || (event.key === "S")) {
        scoreLeft++;
        document.getElementById("score-player-left").innerHTML = scoreLeft;
    } 
    if((event.key === "l") || (event.key === "L")) {
        scoreRight++;
        document.getElementById("score-player-right").innerHTML = scoreRight;
    } 
}



/* -What if a user starts pressing a key before the game is started, what should happen?
Nothing happens, the divs are unclickable before starting the game.
-What if the game is a draw? Are both winners? None winners? Maybe indicate to the user that is was a draw.
Indicated.
-What if no time was specified for the game?
An alert message to remind the user about timing.
-What if there were no key presses before the game ends? 
Reminds the user that s/he needs to press any key, l/S. */