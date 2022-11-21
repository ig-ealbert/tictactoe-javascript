let turn; // 0 = X, 1 = O
let gameState; // Matrix; 0 = X, 1 = O, 2 = Blank
const board = document.getElementById("gameBoard");
const message = document.getElementById("winMessage");
const resetButton = document.getElementById("restartGame");
initializeGame();

function initializeGame() {
  board.innerHTML = "";
  message.innerHTML = "";
  resetButton.classList.remove("greenBorder");

  const space = `
    <input type="image" src="Blank.png" alt="game board space" 
    class="space" onclick="return spaceClicked(this)" />`;

  for (let i = 0; i < 3; i++) {
    const row = board.insertRow(i);
    for (let j = 0; j < 3; j++) {
      const cell = row.insertCell(j);
      cell.innerHTML = space;
    }
  }
  
  turn = 0; // X starts
  gameState = [
    [2, 2, 2],
    [2, 2, 2],
    [2, 2, 2]
  ]; // Board is empty
}

function spaceClicked(button) {
  const col = button.parentNode.cellIndex;
  const row = button.parentNode.parentNode.rowIndex;
  if (gameState[row][col] === 2) {
    gameState[row][col] = turn;
    message.innerHTML = "";
    button.src = updateSpaceImage(turn);
    checkForWin();
  }
  else {
    message.innerHTML = "Please select a blank space.";
  }
}

function updateSpaceImage(turn) {
  return turn === 0 ? "XSpace.png" : "OSpace.png";
}

function checkForWin() {
  let won = false;
  for (const [i, row] of gameState.entries()) {
    const col = constructCol(i);
    if (didWin(row) || didWin(col)) {
      won = true;
      break;
    }
  }
  const diagonals = constructDiagonals();
  won = won || didWin(diagonals[0]) || didWin(diagonals[1]);
  if (won) {
    const player = (turn == 0 ? "X" : "O");
    endGame(`Player ${player} won the game!`);
  }
  else {
    turn = (turn + 1) % 2;
    checkForDraw();
  }
}

function didWin(group) {
  return (group[0] === group[1] &&
          group[1] === group[2] &&
          group[0] !== 2);
}

function constructCol(colIndex) {
  return [gameState[0][colIndex],
          gameState[1][colIndex],
          gameState[2][colIndex]];
}

function constructDiagonals() {
  downDiagonal = [gameState[0][0],
                  gameState[1][1],
                  gameState[2][2]];
  upDiagonal = [gameState[0][2],
                gameState[1][1],
                gameState[2][0]];
  return [downDiagonal, upDiagonal];
}

function checkForDraw() {
  for (const row of gameState) {
    if (row.indexOf(2) >= 0) { // IE does not support Array.prototype.includes
      return;
    }
  }
  return endGame("The game is a draw!");
}

function endGame(gameResult) {
  message.innerHTML = gameResult;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board.rows[i].cells[j].children[0].disabled = true;
    }
  }
  resetButton.classList.add("greenBorder");
}