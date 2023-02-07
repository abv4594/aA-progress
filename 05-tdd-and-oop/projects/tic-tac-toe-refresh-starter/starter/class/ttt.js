const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);


    Screen.addCommand('a', 'Press a to go down',this.cursor.down.bind(this.cursor));
    Screen.addCommand('s', 'Press s to go up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('d', 'Press d to go left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('f', 'Press f to go right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('x', 'Mark X', this.mark.bind(this,'X'));
    Screen.addCommand('o', 'Mark O', this.mark.bind(this,'O'));

    
    this.cursor.setBackgroundColor(); // sets initial pos in yellow
    Screen.render();
  
  }

  mark(turn) {
    if (this.posOccupied()) {
      Screen.setMessage('Position occupied');
      Screen.render();
      return
    }

    if (turn !== this.playerTurn) {
      Screen.setMessage(`Not ${turn} turn`);
      Screen.render();
      return
    }

    //all right, valid move
    this.switchTurn();

    this.grid[this.cursor.row][this.cursor.col] = turn;
    Screen.setGrid(this.cursor.row, this.cursor.col, turn);
    const possibleWinner = TTT.checkWin(this.grid);
    if (possibleWinner) TTT.endGame(possibleWinner);
  }

  posOccupied() {
    if (this.grid[this.cursor.row][this.cursor.col] != ' ') return true
  }

  switchTurn() {
    if (this.playerTurn === 'X') {
      this.playerTurn = 'O'
    } else {
      this.playerTurn = 'X'
    };

  }


  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    
    let possibleWinner

    //check rows
    possibleWinner = winner(grid);
    if (possibleWinner) return possibleWinner;

    //check cols
    possibleWinner = winner(transpose(grid)); 
    if (possibleWinner) return possibleWinner;   

    //check diagonal
    possibleWinner = winnerInRow(diag(grid));
    if (possibleWinner) return possibleWinner;   

    //check inverted diagonal
    possibleWinner = winnerInRow(diagInv(grid));
    if (possibleWinner) return possibleWinner;

    //has not ended
    if (grid.some(row => row.some(el => el === ' '))) return false

    //if all fails return 'T'
    return 'T'

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

function transpose(matrix) {
  let newMatrix = [];
  for (let i = 0; i < matrix.length; i++) {
    newMatrix.push(matrix.map(row => row[i]))
  }
  return newMatrix
}

function winnerInRow(arr) {
  if (arr.every(el => el === 'X')) return 'X'
  else if (arr.every(el => el === 'O')) return 'O'  
}

function winner(matrix) { 
  for (let row = 0; row < matrix.length; row++) {
    const possibleWinner = winnerInRow(matrix[row]);
    if (possibleWinner) return possibleWinner
  }
}

function diag(matrix) {
  return matrix.map((row, col) => row[col])
}

function diagInv(matrix) {
  const numRows = matrix.length
  return matrix.map((row, col) => row[numRows - 1 - col])
}

module.exports = TTT;
