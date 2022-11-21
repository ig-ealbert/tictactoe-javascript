QUnit.test( "X is the first player", function( assert ) {
  initializeGame();
  assert.equal( turn, 0, "X goes first." );
});

QUnit.test( "Game starts with a blank board", function( assert ) {
  initializeGame();
  assert.deepEqual( gameState, [[2,2,2],[2,2,2],[2,2,2]], "Gameboard is blank." );
});

QUnit.test( "X marker is placed on X turn", function (assert ) {
  initializeGame();
  assert.equal( updateSpaceImage(turn), "XSpace.png", "X image should mark a space on X's turn." );
});

QUnit.test( "O marker is placed on O turn", function (assert ) {
  initializeGame();
  turn = 1;
  assert.equal( updateSpaceImage(turn), "OSpace.png", "O image should mark a space on O's turn." );
});

QUnit.test( "Clicking a space with an X does not update it", function (assert ) {
  initializeGame();
  turn = 1;
  gameState = [[2,2,2],[2,0,2],[2,2,2]];
  var button = document.getElementById("gameBoard").rows[1].cells[1].children[0];
  spaceClicked(button);
  assert.deepEqual( gameState, [[2,2,2],[2,0,2],[2,2,2]], "A player cannot mark a non-blank space." );
});

QUnit.test( "Clicking a space with an O does not update it", function (assert ) {
  initializeGame();
  gameState = [[2,2,2],[2,1,2],[2,2,2]];
  var button = document.getElementById("gameBoard").rows[1].cells[1].children[0];
  spaceClicked(button);
  assert.deepEqual( gameState, [[2,2,2],[2,1,2],[2,2,2]], "A player cannot mark a non-blank space." );
});

QUnit.test( "Clicking a space with an X prompts you to select a blank space", function (assert ) {
  initializeGame();
  turn = 1;
  gameState = [[2,2,2],[2,0,2],[2,2,2]];
  var button = document.getElementById("gameBoard").rows[1].cells[1].children[0];
  spaceClicked(button);
  assert.equal( message.innerHTML, "Please select a blank space.", "A message guides you to select a non-blank space." );
});

QUnit.test( "Clicking a space with an O prompts you to select a blank space", function (assert ) {
  initializeGame();
  gameState = [[2,2,2],[2,1,2],[2,2,2]];
  var button = document.getElementById("gameBoard").rows[1].cells[1].children[0];
  spaceClicked(button);
  assert.equal( message.innerHTML, "Please select a blank space.", "A message guides you to select a non-blank space." );
});

QUnit.test( "X wins with 3 Xs on the first row", function (assert ) {
  initializeGame();
  gameState = [[0,0,0],[2,2,2],[2,2,2]];
  assert.equal( didWin(gameState[0]), true, "Player X wins by owning the entire first row." );
});

QUnit.test( "O wins with 3 Os on the first row", function (assert ) {
  initializeGame();
  gameState = [[1,1,1],[2,2,2],[2,2,2]];
  assert.equal( didWin(gameState[0]), true, "Player O wins by owning the entire first row." );
});

QUnit.test( "X wins with 3 Xs on the second row", function (assert ) {
  initializeGame();
  gameState = [[2,2,2],[0,0,0],[2,2,2]];
  assert.equal( didWin(gameState[1]), true, "Player X wins by owning the entire second row." );
});

QUnit.test( "O wins with 3 Os on the second row", function (assert ) {
  initializeGame();
  gameState = [[2,2,2],[1,1,1],[2,2,2]];
  assert.equal( didWin(gameState[1]), true, "Player O wins by owning the entire second row." );
});

QUnit.test( "X wins with 3 Xs on the third row", function (assert ) {
  initializeGame();
  gameState = [[2,2,2],[2,2,2],[0,0,0]];
  assert.equal( didWin(gameState[2]), true, "Player X wins by owning the entire third row." );
});

QUnit.test( "O wins with 3 Os on the third row", function (assert ) {
  initializeGame();
  gameState = [[2,2,2],[2,2,2],[1,1,1]];
  assert.equal( didWin(gameState[2]), true, "Player O wins by owning the entire third row." );
});

QUnit.test( "X wins with 3 Xs on the first column", function (assert ) {
  initializeGame();
  gameState = [[0,2,2],[0,2,2],[0,2,2]];
  assert.equal( didWin(constructCol(0)), true, "Player X wins by owning the entire first column." );
});

QUnit.test( "O wins with 3 Os on the first column", function (assert ) {
  initializeGame();
  gameState = [[1,2,2],[1,2,2],[1,2,2]];
  assert.equal( didWin(constructCol(0)), true, "Player O wins by owning the entire first column." );
});

QUnit.test( "X wins with 3 Xs on the second column", function (assert ) {
  initializeGame();
  gameState = [[2,0,2],[2,0,2],[2,0,2]];
  assert.equal( didWin(constructCol(1)), true, "Player X wins by owning the entire second column." );
});

QUnit.test( "O wins with 3 Os on the second column", function (assert ) {
  initializeGame();
  gameState = [[2,1,2],[2,1,2],[2,1,2]];
  assert.equal( didWin(constructCol(1)), true, "Player O wins by owning the entire second column." );
});

QUnit.test( "X wins with 3 Xs on the third column", function (assert ) {
  initializeGame();
  gameState = [[2,2,0],[2,2,0],[2,2,0]];
  assert.equal( didWin(constructCol(2)), true, "Player X wins by owning the entire third column." );
});

QUnit.test( "O wins with 3 Os on the third column", function (assert ) {
  initializeGame();
  gameState = [[2,2,1],[2,2,1],[2,2,1]];
  assert.equal( didWin(constructCol(2)), true, "Player O wins by owning the entire third column." );
});

QUnit.test( "X wins with 3 Xs on the forward slash diagonal", function (assert ) {
  initializeGame();
  gameState = [[2,2,0],[2,0,2],[0,2,2]];
  assert.equal( didWin(constructDiagonals()[1]), true, "Player X wins by owning the upward diagonal." );
});

QUnit.test( "O wins with 3 Os on the forward slash diagonal", function (assert ) {
  initializeGame();
  gameState = [[2,2,1],[2,1,2],[1,2,2]];
  assert.equal( didWin(constructDiagonals()[1]), true, "Player O wins by owning the upward diagonal." );
});

QUnit.test( "X wins with 3 Xs on the backward slash diagonal", function (assert ) {
  initializeGame();
  gameState = [[0,2,2],[2,0,2],[2,2,0]];
  assert.equal( didWin(constructDiagonals()[0]), true, "Player X wins by owning the downward diagonal." );
});

QUnit.test( "O wins with 3 Os on the backward slash diagonal", function (assert ) {
  initializeGame();
  gameState = [[1,2,2],[2,1,2],[2,2,1]];
  assert.equal( didWin(constructDiagonals()[0]), true, "Player O wins by owning the downward diagonal." );
});

QUnit.test( "The game is a draw if the board is full and no player won", function (assert ) {
  initializeGame();
  gameState = [[0,1,0],[0,0,1],[1,0,1]];
  checkForDraw();
  assert.equal( message.innerHTML, "The game is a draw!", "The game is a draw and that message should be displayed." );
});

QUnit.test( "All spaces should be disabled when the game is a draw", function (assert ) {
  initializeGame();
  gameState = [[0,1,0],[0,0,1],[1,0,1]];
  checkForDraw();
  let disabled = true;
  for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (!board.rows[i].cells[j].children[0].disabled) disabled = false;
		}
	}
  assert.equal( disabled, true, "All spaces should be disabled upon detecting a draw." );
});

QUnit.test( "All spaces should be disabled when the game is won", function (assert ) {
  initializeGame();
  gameState = [[1,1,1],[0,0,1],[1,0,0]];
  checkForWin();
  let disabled = true;
  for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (!board.rows[i].cells[j].children[0].disabled) disabled = false;
		}
	}
  assert.equal( disabled, true, "All spaces should be disabled upon detecting a win." );
});

QUnit.test( "A message should be shown when the player X wins the game", function (assert ) {
  initializeGame();
  gameState = [[0,0,0],[1,1,0],[0,1,1]];
  checkForWin();
  assert.equal( message.innerHTML, "Player X won the game!", "A message should indicate that player X won the game." );
});

QUnit.test( "A message should be shown when the player O wins the game", function (assert ) {
  initializeGame();
  gameState = [[1,0,1],[0,1,0],[1,0,0]];
  turn = 1;
  checkForWin();
  assert.equal( message.innerHTML, "Player O won the game!", "A message should indicate that player O won the game." );
});

QUnit.test( "The reset button should be highlighted when the game is won", function (assert ) {
  initializeGame();
  gameState = [[0,0,0],[1,1,0],[0,1,1]];
  checkForWin();
  assert.equal( resetButton.classList.contains("greenBorder"), true, "The reset button should have a green border." );
});

QUnit.test( "The reset button should be highlighted when the game is a draw", function (assert ) {
  initializeGame();
  gameState = [[0,1,0],[0,0,1],[1,0,1]];
  checkForDraw();
  assert.equal( resetButton.classList.contains("greenBorder"), true, "The reset button should have a green border." );
});

QUnit.test( "The reset button should not be highlighted when the game starts", function (assert ) {
  initializeGame();
  assert.equal( resetButton.classList.contains("greenBorder"), false, "The reset button should not have a green border." );
});