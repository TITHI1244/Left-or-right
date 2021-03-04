const duration = document.getElementById("game-duration");
const startBtn = document.getElementById("start-btn");
let counter = document.getElementById("counter");
const restartBtn = document.getElementById("restart-btn");
const playerS = document.getElementById("player-s");
let scoreS = 0;
const playerL = document.getElementById("player-l");
let scoreL = 0;
const sConfetti = document.getElementById("confetti-s");
const lConfetti = document.getElementById("confetti-l");
const resultDiv = document.getElementById("result");
const possibleResults = ["Winner: S", "Winner: L", "It's a tie!!"];
let confetti_l;
let confetti_s;
let lastWinner = "";

window.addEventListener("load", beginningState);
function beginningState() {
  if (lastWinner === "S") {
    confetti_s.clear();
  } else if (lastWinner === "L") {
    confetti_l.clear();
  }
  sConfetti.style.display = "none";
  lConfetti.style.display = "none";
  startBtn.style.visibility = "visible";
  startBtn.disabled = false;
  resultDiv.style.display = "none";
  scoreS = scoreL = 0;
  counter.innerHTML = "--";
  duration.value = "";
  document.getElementById("score-player-s").innerHTML = "";
  document.getElementById("score-player-l").innerHTML = "";
}

startBtn.addEventListener("click", startTheGame);
function startTheGame() {
  const gameDuration = parseInt(duration.value);
  if (Number.isInteger(gameDuration) && gameDuration > 0) {
    document.addEventListener("keydown", updateScore);
    startBtn.disabled = true;
    counter.innerHTML = gameDuration < 10 ? "0" + gameDuration : gameDuration;
    let count = gameDuration;
    const interval = setInterval(function () {
      count--;
      counter.innerHTML = count < 10 ? "0" + count : count;
    }, 1000);
    setTimeout(function () {
      clearInterval(interval);
      resultDiv.style.display = "block";
      startBtn.style.visibility = "hidden";
      document.removeEventListener("keydown", updateScore);
      addConfetti();
    }, gameDuration * 1000);
    restartBtn.addEventListener("click", beginningState);
  } else {
    alert("Please enter valid game duration first to start...");
  }
}

function updateScore(event) {
  if (event.key === "s" || event.key === "S") {
    scoreS++;
    document.getElementById("score-player-s").innerHTML = scoreS;
  }
  if (event.key === "l" || event.key === "L") {
    scoreL++;
    document.getElementById("score-player-l").innerHTML = scoreL;
  }
}
function addConfetti() {
  sConfetti.style.display = "block";
  lConfetti.style.display = "block";
  // playerL.style.padding = "0";
  // playerS.style.padding = "0";
  if (scoreL < scoreS) {
    confetti_s = new ConfettiGenerator({
      target: "confetti-s",
      width: 300,
      height: 300,
    });
    confetti_s.render();
    document.getElementById("show-result").textContent = possibleResults[0];
    lastWinner = "S";
  } else if (scoreL > scoreS) {
    confetti_l = new ConfettiGenerator({
      target: "confetti-l",
      width: 300,
      height: 300,
    });
    confetti_l.render();
    document.getElementById("show-result").textContent = possibleResults[1];
    lastWinner = "L";
  } else {
    document.getElementById("show-result").textContent = possibleResults[2];
  }
}
