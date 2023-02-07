class ComputerPlayer {

  static getValidMoves(grid) {
    const validMoves = [];
    grid.forEach((row,i) => {
      row.forEach((col,j) => {
        if (grid[i][j] === ' ') 
          validMoves.push({row: i, col: j});
      })
    });
    return validMoves;
  }

  static randomMove(grid) {
    const validMoves = ComputerPlayer.getValidMoves(grid);
    const validMovesLength = validMoves.length;
    return validMoves[Math.floor(Math.random()*validMovesLength)];
  }

  static getWinningMoves(grid, symbol) {

    // Your code here

  }

  static getSmartMove(grid, symbol) {

    // obj to store status of each row, collumn and diagonals
    // {sw: [smart wins], sb: [smart blocks], bt:[block traps]} - sw = smartWin | sb = smartblock

    let radar = {sw:[], sb:[]};
    
    let gridT = ComputerPlayer.transpose(grid);

    let smartWin;
    let oppositeSymbol = ComputerPlayer.switchSymbol(symbol);
    let smartBlock;

    for (let i = 0; i < grid.length; i++ ) {

      // for rows...
      smartWin = ComputerPlayer.checkDouble(grid[i], symbol);
      smartBlock = ComputerPlayer.checkDouble(grid[i], oppositeSymbol);
  
      if (smartWin) radar.sw.push({row: i, col: grid[i].indexOf(' ')});
      if (smartBlock) radar.sb.push({ row: i, col: grid[i].indexOf(' ') });
    
      // for cols...
      smartWin = ComputerPlayer.checkDouble(gridT[i], symbol);
      smartBlock = ComputerPlayer.checkDouble(gridT[i], oppositeSymbol);
    
      if (smartWin) radar.sw.push({ row: gridT[i].indexOf(' ') , col: i });
      if (smartBlock) radar.sb.push({ row: gridT[i].indexOf(' '), col: i });

    }

    // for diags...
    // diagonal to the right:
    let diag = ComputerPlayer.diag(grid);
    let idx = diag.indexOf(' ');
    smartWin = ComputerPlayer.checkDouble(diag, symbol);
    smartBlock = ComputerPlayer.checkDouble(diag, oppositeSymbol);
    if (smartWin) radar.sw.push({ row: idx, col: idx });
    if (smartBlock) radar.sb.push({ row: idx, col: idx });

    // diagonal to the left:
    diag = ComputerPlayer.diagInv(grid);
    idx = diag.indexOf(' ');
    smartWin = ComputerPlayer.checkDouble(diag, symbol);
    smartBlock = ComputerPlayer.checkDouble(diag, oppositeSymbol);
    if (smartWin) radar.sw.push({ row: idx, col: grid.length - 1 - idx });
    if (smartBlock) radar.sb.push({ row: idx, col: grid.length - 1 - idx });

    // identifying traps:
    // a trap is a position which filled by opponent will create two winning situations
    // for the opponent
    // to be done.

    // selecting the answer:
    if (radar.sw.length !==0) return radar.sw[0]; // if there is a smartwin return smartwin
    if (radar.sb.length !==0) return radar.sb[0]; // else return smartBlock

    return null;


  }

  static checkDouble(row, symbol) {
    if ((row.join('').split(' ').join('')) === (symbol + symbol)){
      return true} 
      else {
    return false}
  }

  static switchSymbol(symbol) {
    if (symbol === 'X') return 'O';
    else if (symbol === 'O') return 'X';
  }

  static transpose(matrix) {
    let newMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
      newMatrix.push(matrix.map(row => row[i]))
    }
    return newMatrix
  }

  static diag(matrix) {
    return matrix.map((row, col) => row[col])
  }

  static diagInv(matrix) {
    const numRows = matrix.length
    return matrix.map((row, col) => row[numRows - 1 - col])
  }

}

module.exports = ComputerPlayer;
