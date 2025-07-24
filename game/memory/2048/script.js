const grid = document.getElementById('grid');
const scoreText = document.getElementById('score');
const message = document.getElementById('message');

let board = [];
let score = 0;

function createGrid() {
  grid.innerHTML = '';
  board = new Array(4).fill(null).map(() => new Array(4).fill(0));
  for (let i = 0; i < 16; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = '';
    grid.appendChild(cell);
  }
  addNumber();
  addNumber();
  updateGrid();
}

function updateGrid() {
  const cells = document.querySelectorAll('.cell');
  board.flat().forEach((value, index) => {
    const cell = cells[index];
    cell.textContent = value === 0 ? '' : value;
    cell.setAttribute('data-value', value);
  });
  scoreText.textContent = `Score: ${score}`;
}

function addNumber() {
  let empty = [];
  board.forEach((row, i) =>
    row.forEach((val, j) => {
      if (val === 0) empty.push([i, j]);
    })
  );
  if (empty.length === 0) return;
  const [x, y] = empty[Math.floor(Math.random() * empty.length)];
  board[x][y] = Math.random() > 0.1 ? 2 : 4;
}

function move(direction) {
  let changed = false;

  function operate(row) {
    let newRow = row.filter(val => val);
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        score += newRow[i];
        newRow[i + 1] = 0;
      }
    }
    return newRow.filter(val => val).concat(new Array(4 - newRow.filter(val => val).length).fill(0));
  }

  for (let i = 0; i < 4; i++) {
    let original;
    if (direction === 'left') {
      original = board[i].slice();
      board[i] = operate(board[i]);
    } else if (direction === 'right') {
      original = board[i].slice();
      board[i] = operate(board[i].slice().reverse()).reverse();
    } else if (direction === 'up') {
      original = [board[0][i], board[1][i], board[2][i], board[3][i]];
      const operated = operate(original);
      for (let j = 0; j < 4; j++) board[j][i] = operated[j];
    } else if (direction === 'down') {
      original = [board[0][i], board[1][i], board[2][i], board[3][i]];
      const operated = operate(original.reverse()).reverse();
      for (let j = 0; j < 4; j++) board[j][i] = operated[j];
    }

    if (JSON.stringify(original) !== JSON.stringify(direction === 'up' || direction === 'down'
      ? [board[0][i], board[1][i], board[2][i], board[3][i]]
      : board[i])) {
      changed = true;
    }
  }

  if (changed) {
    addNumber();
    updateGrid();
    if (checkGameOver()) {
      message.textContent = "Game Over!";
      document.removeEventListener('keydown', handleKeyPress);
    } else if (checkWin()) {
      message.textContent = "You reached 2048! 🎉";
    }
  }
}

function checkGameOver() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) return false;
      if (j < 3 && board[i][j] === board[i][j + 1]) return false;
      if (i < 3 && board[i][j] === board[i + 1][j]) return false;
    }
  }
  return true;
}

function checkWin() {
  return board.flat().includes(2048);
}

function handleKeyPress(e) {
  switch (e.key) {
    case 'ArrowUp': move('up'); break;
    case 'ArrowDown': move('down'); break;
    case 'ArrowLeft': move('left'); break;
    case 'ArrowRight': move('right'); break;
  }
}

function startGame() {
  score = 0;
  message.textContent = '';
  document.addEventListener('keydown', handleKeyPress);
  createGrid();
}

startGame();
