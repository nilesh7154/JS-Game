let direction = { x: 0, y: 0 };
let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("foodmusic.wav");
let gameOverSound = new Audio("cdmusic.wav");
let moveSound = new Audio("wholesng.wav");
let musicSound = new Audio("bgmusic.wav");
let speed = 3;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  return (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  );
}

function gameEngine() {
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    moveSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game over. Press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
  }

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score++;
    if (score > highscoreval) {
      highscoreval = score;
      localStorage.setItem("highscore", JSON.stringify(highscoreval));
      highscoreBox.innerHTML = "Highscore: " + highscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2, b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  board.innerHTML = "";

  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.classList.add(index === 0 ? "head" : "snake");
    board.appendChild(snakeElement);
  });

  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Highscore
let highscore = localStorage.getItem("highscore");
let highscoreval = highscore === null ? 0 : JSON.parse(highscore);
if (highscore === null) {
  localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
highscoreBox.innerHTML = "Highscore: " + highscoreval;

window.requestAnimationFrame(main);

// Keyboard Controls
window.addEventListener("keydown", (e) => {
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir = { x: 0, y: -1 }; break;
    case "ArrowDown":
      inputDir = { x: 0, y: 1 }; break;
    case "ArrowLeft":
      inputDir = { x: -1, y: 0 }; break;
    case "ArrowRight":
      inputDir = { x: 1, y: 0 }; break;
  }
});

// Mobile Controls
document.getElementById("up").addEventListener("click", () => {
  inputDir = { x: 0, y: -1 };
  moveSound.play();
});
document.getElementById("down").addEventListener("click", () => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
});
document.getElementById("left").addEventListener("click", () => {
  inputDir = { x: -1, y: 0 };
  moveSound.play();
});
document.getElementById("right").addEventListener("click", () => {
  inputDir = { x: 1, y: 0 };
  moveSound.play();
});
