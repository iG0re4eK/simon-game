const colors = ["green", "red", "yellow", "blue"];
const squares = document.querySelectorAll(".square");
const counter = document.getElementById("counter");
const container = document.getElementById("container");
const startGame = document.getElementById("startGame");
const restartGame = document.getElementById("restartGame");

let moves = [];
let step = 0;
let count = 0;
let time = 500;
let isShowingSequence = false;
let gameActive = false;

squares.forEach((squaresElement, index) => {
  squaresElement.style.backgroundColor = colors[index];
  squaresElement.setAttribute("id", `${index}`);
});

function randomId(length) {
  return Math.floor(Math.random() * length);
}

function game() {
  if (!gameActive) return;

  const id = randomId(colors.length);
  moves.push(id);

  isShowingSequence = true;

  for (let i = 0; i < moves.length; i++) {
    setTimeout(() => {
      const squareId = moves[i];
      const square = squares[squareId];

      square.style.animation = `press ${time / 1000}s ease`;

      square.addEventListener("animationend", function handler() {
        square.style.animation = "";
        square.removeEventListener("animationend", handler);

        if (i === moves.length - 1) {
          isShowingSequence = false;
        }
      });
    }, i * (time + 200));
  }
}

container.addEventListener("click", (event) => {
  if (!gameActive || isShowingSequence) return;

  const clickObj = event.target;
  if (clickObj.classList.contains("square")) {
    const clickedId = Number(clickObj.getAttribute("id"));

    if (clickedId !== moves[step]) {
      gameOver();
      return;
    }

    clickObj.style.animation = `press ${time / 1000}s ease`;
    clickObj.addEventListener("animationend", function handler() {
      clickObj.style.animation = "";
      clickObj.removeEventListener("animationend", handler);
    });
    step++;
  }

  if (step === moves.length) {
    step = 0;
    count++;
    counter.textContent = count;
    setTimeout(game, 1000);
  }
});

function gameOver() {
  alert("Вы проиграли! Начинаем заново.");
  counter.textContent = `Итог: ${count}`;
  restartGame.style.display = "block";
  gameActive = false;
}

function resetGame() {
  moves = [];
  step = 0;
  count = 0;
  isShowingSequence = false;
  counter.textContent = "0";
}

function initGame() {
  resetGame();
  counter.style.display = "none";
  restartGame.style.display = "none";
  startGame.style.display = "block";
  gameActive = false;
}

startGame.addEventListener("click", () => {
  counter.style.display = "block";
  startGame.style.display = "none";
  gameActive = true;
  game();
});

restartGame.addEventListener("click", () => {
  initGame();
});

initGame();
