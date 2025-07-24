let playerScore = 0;
let computerScore = 0;

function play(playerChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  const result = getResult(playerChoice, computerChoice);
  displayResult(result, playerChoice, computerChoice);
  updateScore(result);
}

function getResult(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'win';
  } else {
    return 'lose';
  }
}

function displayResult(result, player, computer) {
  const resultText = document.getElementById('result');
  if (result === 'draw') {
    resultText.textContent = `It's a draw! Both chose ${player}.`;
  } else if (result === 'win') {
    resultText.textContent = `You win! ${player} beats ${computer}.`;
  } else {
    resultText.textContent = `You lose! ${computer} beats ${player}.`;
  }
}

function updateScore(result) {
  if (result === 'win') playerScore++;
  if (result === 'lose') computerScore++;

  document.getElementById('playerScore').textContent = playerScore;
  document.getElementById('computerScore').textContent = computerScore;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  document.getElementById('playerScore').textContent = 0;
  document.getElementById('computerScore').textContent = 0;
  document.getElementById('result').textContent = 'Make your move!';
}
