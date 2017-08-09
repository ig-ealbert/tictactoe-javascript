var turn; // 0 = X, 1 = O
var gameState; // Matrix; 0 = X, 1 = O, 2 = Blank
var board = document.getElementById("gameBoard");
var message = document.getElementById("winMessage");
var resetButton = document.getElementById("restartGame");
initializeGame();

function initializeGame() {
	board.innerHTML = "";
	message.innerHTML = "";
	resetButton.classList.remove("greenBorder");

	for (var i = 0; i < 3; i++) {
		var row = board.insertRow(i);
		for (var j = 0; j < 3; j++) {
			var cell = row.insertCell(j);
			cell.innerHTML = '<input type="image" src="Blank.png" alt="game board space" class="space" onclick="return spaceClicked(this)" />';
		}
	}
	
	turn = 0; // X starts
	gameState = [[2, 2, 2], [2, 2, 2], [2, 2, 2]]; // Board is empty
}

function spaceClicked(button) {
	var col = button.parentNode.cellIndex;
	var row = button.parentNode.parentNode.rowIndex;
	if (gameState[row][col] === 2) {
		gameState[row][col] = turn;
		message.innerHTML = "";
		button.src = updateSpaceImage(turn);
		checkForWin(gameState);
	}
	else {
		message.innerHTML = "Please select a blank space.";
	}
}

function updateSpaceImage(turn) {
	if (turn === 0) return "XSpace.png";
	else return "OSpace.png";
}

function checkForWin(gameState) {
	var won = false;
	for (var i = 0; i < gameState.length; i++) {
		if (horizontalWin(gameState, i) || verticalWin(gameState, i)) {
			won = true;
			break;
		}
	}
	won = won || diagonalWin(gameState);
	if (won) {
		var player = (turn == 0 ? "X" : "O");
		endGame("Player " + player + " won the game!");
	}
	else {
		turn = (turn + 1) % 2;
		checkForDraw(gameState);
	}
}

function horizontalWin(gameState, i) {
	return (gameState[i][0] === gameState[i][1] &&
			gameState[i][1] === gameState[i][2] &&
			gameState[i][0] !== 2);
}

function verticalWin(gameState, i) {
	return (gameState[0][i] === gameState[1][i] &&
			gameState[1][i] === gameState[2][i] &&
			gameState[0][i] !== 2);
}

function diagonalWin(gameState) {
	return (((gameState[0][0] === gameState[1][1]) &&
             (gameState[1][1] === gameState[2][2]) &&
			 (gameState[0][0] !== 2)) ||
            ((gameState[0][2] === gameState[1][1]) &&
             (gameState[1][1] === gameState[2][0]) &&
			 (gameState[0][2] !== 2)));
}

function checkForDraw(gameState) {
	var isDraw = true;
    for (var i = 0; i < gameState.length; i++) {
        if (gameState[i].indexOf(2) >= 0) { // IE does not support Array.prototype.includes
            isDraw = false;
            break;
        }
    }
    if (isDraw) {
		endGame("The game is a draw!");
    }
}

function endGame(gameResult) {
	message.innerHTML = gameResult;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			board.rows[i].cells[j].children[0].disabled = true;
		}
	}
	resetButton.classList.add("greenBorder");
}