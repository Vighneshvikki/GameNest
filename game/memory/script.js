const emojis = ['😀', '🎉', '🚀', '🍕', '🐱', '🌈', '🎮', '💡'];
let cards = [...emojis, ...emojis]; // Duplicate for pairs
let flippedCards = [];
let matchedCards = [];
let moves = 0;

const gameBoard = document.getElementById('gameBoard');
const movesText = document.getElementById('moves');

// Shuffle function
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Create card elements
function setupBoard() {
  gameBoard.innerHTML = '';
  shuffle(cards).forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard(e) {
  const card = e.target;
  const emoji = card.dataset.emoji;
  const index = card.dataset.index;

  if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(index)) {
    card.classList.add('flipped');
    card.textContent = emoji;
    flippedCards.push({ card, emoji, index });

    if (flippedCards.length === 2) {
      moves++;
      movesText.textContent = `Moves: ${moves}`;
      checkMatch();
    }
  }
}

function checkMatch() {
  const [first, second] = flippedCards;
  if (first.emoji === second.emoji) {
    matchedCards.push(first.index, second.index);
    flippedCards = [];
    if (matchedCards.length === cards.length) {
      setTimeout(() => alert(`You won in ${moves} moves! 🎉`), 300);
    }
  } else {
    setTimeout(() => {
      first.card.classList.remove('flipped');
      second.card.classList.remove('flipped');
      first.card.textContent = '';
      second.card.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}

function restartGame() {
  flippedCards = [];
  matchedCards = [];
  moves = 0;
  movesText.textContent = 'Moves: 0';
  setupBoard();
}

// Start game
setupBoard();
