let music = new Audio("8-bit.mp3");

let gameOver = new Audio("gameOver.mp3");
let click = new Audio("click.mp3");
let turn = "X";
let isGameOver = false;
function changeTurn() {
  if (turn === "X") {
    return "O";
  } else {
    return "X";
  }
}

function chickWin() {
  let boxtext = document.getElementsByClassName("boxtext");
  let win = [
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
    if (
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.getElementsByClassName("Info")[0].innerHTML =
        boxtext[e[0]].innerText + " won";
      isGameOver = true;
      gameOver.play();
      setImage();
    }
  });
}

function setImage() {
  if (isGameOver) {
    document
      .querySelector(".image-box")
      .getElementsByTagName("img")[0].style.width = "200px";
  } else {
    document
      .querySelector(".image-box")
      .getElementsByTagName("img")[0].style.width = "0px";
  }
}

function reset() {
  let boxtext = document.getElementsByClassName("boxtext");
  Array.from(boxtext).forEach((element) => {
    element.innerHTML = "";
  });
  isGameOver = false;
  setImage();
  document.getElementsByClassName("Info")[0].innerHTML = "turn for X";
  // window.location.reload();
}

// music.loop = true;
// music.play();

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !isGameOver) {
      boxtext.innerText = turn;
      click.play();
      chickWin();
    }

    if (!isGameOver) {
      turn = changeTurn();
      document.getElementsByClassName("Info")[0].innerText = "turn for " + turn;
    }
  });
});
