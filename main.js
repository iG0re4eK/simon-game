const colors = ["green", "red", "yellow", "blue"];
const squares = document.querySelectorAll(".square");
const counter = document.getElementById("counter");

let moves = [];
let count = 0;

squares.forEach((squaresElement, index) => {
  squaresElement.style.backgroundColor = colors[index];
});

function randomId(length) {
  return Math.floor(Math.random() * length);
}

function startGame() {
  const id = randomId(colors.length);
  moves.push(id);
  console.log(moves);

  for (let i = 0; i < moves.length; i++) {
    squares.forEach((squaresElement, index) => {
      if (index === id) {
        squaresElement.style.animation = "press 0.4s ease";
      }
    });
  }
}

startGame();
