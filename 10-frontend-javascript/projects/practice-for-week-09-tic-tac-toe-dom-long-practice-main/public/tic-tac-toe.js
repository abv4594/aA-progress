// Your code here
window.onload = main;

let nextMove = "x";

let board = [ [" ", " ", " "],
              [" ", " ", " "],
              [" ", " ", " "]
]

function main () {
    let positions = document.querySelectorAll("[class^=p");
    positions.forEach(pos => pos.addEventListener("click", click));

}

function click (e) {
    // extracts position in board from class name
    let posString = e.target.className.slice(1);
    let row = parseInt(posString.slice(0,1));
    let col = parseInt(posString.slice(1));

    // remove event listener from the position. Avoid double clicking too.
    e.target.removeEventListener("click", click);

    // update board logic
    board[row][col] = nextMove;

    // update board UI
    e.target.innerHTML = `
        <img src="../player-${nextMove}.svg">
    `;

    if (checkWinner(nextMove)) {
        document.getElementById("header").innerText = `Winner: ${nextMove}`;
    }
    // switch player
    if (nextMove === "x") nextMove = "o"
    else nextMove = "x";

    

}

function checkWinner (symbol) {
    
    // get transposed version of board
    let tBoard = ([0,1,2].map(colNum => [0,1,2].reduce((acc, el) => {
        acc.push(board[el][colNum]);
        return acc
        },[])));
    console.log(tBoard);

    let diag1 = [board[0][0], board[1][1], board[2][2]];
    let diag2 = [tBoard[0][0], tBoard[1][1], tBoard[2][2]];
    let diagonals = [diag1, diag2];

    // check rows
    if (board.some(row => row.every(pos => pos === symbol))) return true;

    // check cols
    if (tBoard.some(row => row.every(pos => pos === symbol))) return true;

    // check diagonals
    if (diagonals.some(row => row.every(pos => pos === symbol))) return true;
}






