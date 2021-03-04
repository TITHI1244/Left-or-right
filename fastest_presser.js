const duration = document.getElementById("game-duration");
const startBtn = document.getElementById("start-btn");
let counter = document.getElementById("counter");
const playerLeft = document.getElementById("player-left");
let scoreLeft = 0;
const playerRight = document.getElementById("player-right");
let scoreRight = 0;

// make the divs clickable by adding tabindex
function beginningState() {
  startBtn.disabled = false;
  scoreLeft = scoreRight = 0;
  counter.innerHTML = "--";
  duration.value = "";
  document.getElementById("score-player-left").innerHTML = "";
  document.getElementById("score-player-right").innerHTML = "";
}
function gameFinished() {
  clearInterval(startInterval);
  document.removeEventListener("keydown", updateScore);
}

window.addEventListener("load", beginningState);
// game started...
let startInterval;
function startTheGame() {
  if (duration.value === "") {
    alert("Please enter the game duration first to start...");
  } else {
    document.addEventListener("keydown", updateScore);
    const gameDuration = parseInt(duration.value);
    startBtn.disabled = true;
    counter.innerHTML = gameDuration < 10 ? "0" + gameDuration : gameDuration;
    let count = gameDuration;
    startInterval = setInterval(function () {
      count--;
      counter.innerHTML = count < 10 ? "0" + count : count;
    }, 1000);
    setTimeout(function () {
      gameFinished();
    }, gameDuration * 1000);
  }
}
startBtn.addEventListener("click", startTheGame);
// updates the scores
function updateScore(event) {
  if (event.key === "s" || event.key === "S") {
    scoreLeft++;
    document.getElementById("score-player-left").innerHTML = scoreLeft;
  }
  if (event.key === "l" || event.key === "L") {
    scoreRight++;
    document.getElementById("score-player-right").innerHTML = scoreRight;
  }
}
