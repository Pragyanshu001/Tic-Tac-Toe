// --- AUDIO FILES (Require files to be present in your project folder) ---
let music = new Audio("8-bit.mp3"); // Background music (optional)
let gameOver = new Audio("gameOver.mp3"); // Sound for win/draw
let click = new Audio("click.mp3"); // Sound for each box click

// Optional: Uncomment the lines below to play background music when game starts
// music.loop = true;
// music.play();
// -------------------------------------------------------------------------

let turn = "X";
let isGameOver = false;

// Get elements
const playerXCard = document.getElementById("playerX-card");
const playerOCard = document.getElementById("playerO-card");
const playerOYTurnText = playerOCard.querySelector(".your-turn-text");
const winnerOverlay = document.createElement("div");
winnerOverlay.id = "winner-overlay";
document.body.appendChild(winnerOverlay);
const resetButton = document.getElementById("reset");

// Function to update which player card is active
function updateActivePlayerCard() {
  if (turn === "X") {
    playerXCard.classList.add("active-player");
    playerOCard.classList.remove("active-player");
    if (playerOYTurnText) playerOYTurnText.style.display = "none";
  } else {
    playerXCard.classList.remove("active-player");
    playerOCard.classList.add("active-player");
    if (playerOYTurnText) playerOYTurnText.style.display = "block";
  }
  if (!isGameOver) {
    resetButton.style.display = "block";
  }
}

// Function to toggle between X and O
function changeTurn() {
  turn = turn === "X" ? "O" : "X";
  updateActivePlayerCard();
}

// Function to show the custom winner overlay
function showWinnerOverlay(message, isDraw = false) {
  const imgWidth = isDraw ? "150px" : "250px";

  const overlayContent = `
        <p id="winner-message">${message}</p>
        <div class="image-box">
            <img src="Winner.gif" alt="Winner celebration" class="imgBox" style="width:${imgWidth}; max-width:250px;"/>
        </div>
        <button id="play-again" class="reset-button">Play Again</button>
    `;

  winnerOverlay.innerHTML = overlayContent;
  winnerOverlay.classList.add("show");

  document.getElementById("play-again").addEventListener("click", resetGame);

  resetButton.style.display = "none";
}
function chickWin() {
  let boxtext = document.getElementsByClassName("boxtext");
  let boxes = document.getElementsByClassName("box");
  let winnerFound = false;

  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  win.forEach((e) => {
    const textA = boxtext[e[0]].innerText;
    const textB = boxtext[e[1]].innerText;
    const textC = boxtext[e[2]].innerText;

    // Check for Win
    if (textA !== "" && textA === textB && textA === textC) {
      isGameOver = true;
      winnerFound = true;
      gameOver.play();

      showWinnerOverlay(`${textA} Won! 🎉`);

      e.forEach((index) => boxes[index].classList.add("winner"));

      // Deactivate player cards on game end
      playerXCard.classList.remove("active-player");
      playerOCard.classList.remove("active-player");
      if (playerOYTurnText) playerOYTurnText.style.display = "none";
    }
  });

  return winnerFound;
}
// ---------------------------------------------------------------------------------

// Function to reset the game
function resetGame() {
  let boxtext = document.getElementsByClassName("boxtext");
  let boxes = document.getElementsByClassName("box");

  Array.from(boxtext).forEach((element) => {
    element.innerHTML = "";
    element.classList.remove("o-color");
  });
  Array.from(boxes).forEach((element) => {
    element.classList.remove("winner");
  });

  isGameOver = false;
  turn = "X"; // Reset turn to X

  // Hide the custom winner overlay
  winnerOverlay.classList.remove("show");

  resetButton.style.display = "block";

  updateActivePlayerCard();
}

// Main game logic: setting up event listeners on boxes
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !isGameOver) {
      boxtext.innerText = turn;
      click.currentTime = 0;
      click.play();

      if (turn === "O") {
        boxtext.classList.add("o-color");
      } else {
        boxtext.classList.remove("o-color");
      }

      let winner = chickWin();

      if (!winner) {
        let allBoxesFilled = Array.from(
          document.getElementsByClassName("boxtext")
        ).every((el) => el.innerText !== "");

        if (allBoxesFilled) {
          isGameOver = true;
          gameOver.play();
          showWinnerOverlay("It's a Draw! 🤝", true);
          playerXCard.classList.remove("active-player");
          playerOCard.classList.remove("active-player");
          if (playerOYTurnText) playerOYTurnText.style.display = "none";
        } else {
          changeTurn();
        }
      }
    }
  });
});

// Hooking the reset button to the resetGame function
document.getElementById("reset").addEventListener("click", resetGame);

// Initialize the active player card on page load
updateActivePlayerCard();
