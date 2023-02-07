const Screen = require("./screen");
const Cursor = require("./cursor");
const {
  rotate,
  findConsecutives,
  getDiagonals
} = require ("../../../array-functions/index")

class ConnectFour {

  static consecs = 4;

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    this.maxCol = this.grid[0].length -1;
    this.maxRow = this.grid.length - 1;

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('a', 'move left', this.left.bind(this));
    Screen.addCommand('s', 'move right', this.right.bind(this));
    Screen.addCommand('p', 'play', this.play.bind(this));


    this.cursor.setBackgroundColor();
    Screen.render();
  }


  right() {
    this.cursor.resetBackgroundColor();
    this.cursor.right();
    this.cursor.setBackgroundColor();
  }

  left() {
    this.cursor.resetBackgroundColor();
    this.cursor.left();
    this.cursor.setBackgroundColor();
  }

  play() {
    //debugger;
    const rotatedGrid = rotate(this.grid);
    const numRowInRotated = this.cursor.col;
    const rowInRotated = rotatedGrid[numRowInRotated];

    const firstAvail = rowInRotated.indexOf(' ');

    if (firstAvail < 0) return

    const firstAvailNormalized = this.maxRow - firstAvail;
    this.grid[firstAvailNormalized][this.cursor.col] = this.playerTurn;
    Screen.setGrid(firstAvailNormalized, this.cursor.col, this.playerTurn);
    this.switchTurn();

    const possibleWinner = ConnectFour.checkWin(this.grid) 

    if (possibleWinner) ConnectFour.endGame(possibleWinner);

  }

  switchTurn() {
    if (this.playerTurn === 'O') {
      this.playerTurn = 'X'
    } else {
      this.playerTurn = 'O'
    }
  }


  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    if (grid.every(row => row.every(el => el === ' '))) return false

    // check for Horizontal Wins
    if (grid.some(row => findConsecutives(row, 'X') >= ConnectFour.consecs)) return 'X'
    if (grid.some(row => findConsecutives(row, 'O') >= ConnectFour.consecs)) return 'O'

    // check for Vertical Wins
    const rotatedGrid = rotate(grid);
    if (rotatedGrid.some(row => findConsecutives(row, 'X') >= ConnectFour.consecs)) return 'X'
    if (rotatedGrid.some(row => findConsecutives(row, 'O') >= ConnectFour.consecs)) return 'O'

    // check diagonal Wins

    // 1 - get all diagonals then filter only those with length >= threshold and store in diags
    const diags = getDiagonals(grid).filter(diag => diag.length >= ConnectFour.consecs)
    if (diags.some(row => findConsecutives(row, 'X') >= ConnectFour.consecs)) return 'X'
    if (diags.some(row => findConsecutives(row, 'O') >= ConnectFour.consecs)) return 'O'
    // 2 - similar to the above, but rotate to get the diagonals in the other sense
    const invertedDiags = getDiagonals(rotate(grid)).filter(diag => diag.length >= ConnectFour.consecs)
    if (invertedDiags.some(row => findConsecutives(row, 'X') >= ConnectFour.consecs)) return 'X'
    if (invertedDiags.some(row => findConsecutives(row, 'O') >= ConnectFour.consecs)) return 'O'
  
    if (!grid.some(row => row.some(el => el === ' '))) return 'T'
  
    return false
  
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

module.exports = ConnectFour;
