const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const basketImg = new Image();
basketImg.src = "basket.png";

const appleImg = new Image();
appleImg.src = "apple.png";

let basket, apples, score, keys, gameRunning;

const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreDisplay = document.getElementById("finalScore");

function resetGame() {
  basket = {
    x: 160,
    y: 540,
    width: 80,
    height: 60,
    speed: 5
  };

  apples = [];
  score = 0;
  keys = {};
  gameRunning = true;

  scoreDisplay.innerText = "Score: 0";
  gameOverScreen.style.display = "none";

  requestAnimationFrame(updateGame);
}

// Key handling
keys = {};
document.addEventListener("keydown", e => {
  keys[e.key] = true;
});
document.addEventListener("keyup", e => {
  keys[e.key] = false;
});

function drawBasket() {
  ctx.drawImage(basketImg, basket.x, basket.y, basket.width, basket.height);
}

function drawApple(apple) {
  ctx.drawImage(appleImg, apple.x - 15, apple.y - 15, 30, 30); // center it
}

function moveBasket() {
  if (keys["ArrowLeft"] && basket.x > 0) {
    basket.x -= basket.speed;
  }
  if (keys["ArrowRight"] && basket.x + basket.width < canvas.width) {
    basket.x += basket.speed;
  }
}

function createApple() {
  if (!gameRunning) return;
  const x = Math.random() * (canvas.width - 30) + 15;
  apples.push({ x: x, y: 0, speed: 2 + Math.random() * 2 });
}

function gameOver() {
  gameRunning = false;
  finalScoreDisplay.innerText = score;
  gameOverScreen.style.display = "flex";
}

function updateGame() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveBasket();
  drawBasket();

  apples.forEach((apple, index) => {
    apple.y += apple.speed;
    drawApple(apple);

    // Collision check
    if (
      apple.y + 15 >= basket.y &&
      apple.x >= basket.x &&
      apple.x <= basket.x + basket.width
    ) {
      apples.splice(index, 1);
      score++;
      scoreDisplay.innerText = "Score: " + score;
    }

    // Missed apple
    if (apple.y > canvas.height) {
      apples.splice(index, 1);
      gameOver();
    }
  });

  if (gameRunning) requestAnimationFrame(updateGame);
}

// Create apples every second
setInterval(createApple, 1000);

// Restart game
document.getElementById("restartBtn").addEventListener("click", resetGame);

// Start
resetGame();
