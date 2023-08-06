import Board from "./board.js";

let board = new Board(); // creates a new game board

let boardC = new Board(); // board for computer
let computerHits = [];


// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.

// Your code here

window.addEventListener('DOMContentLoaded', e => {

    buildGrid(0); // Human board
    buildGrid(1); // Computer board
    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', reset);

})

const hit = e => {
    e.preventDefault();
    const square = e.target;
    const row = square.dataset.row;
    const col = square.dataset.col;
    const hitResult = board.makeHit(row,col);
    if (!hitResult) {
        square.classList.add('bgRed');
    } else {
        square.classList.add('bgGreen');
        square.innerHTML = 
        `
            <p>${hitResult}</p>
        `
        ;
    }

    if (board.isGameOver()) {
        gameOver("YOU WIN!");
    }

    computerHit();
}

const computerHit = () => {
    let x;
    let y;
    do {
        x = Math.floor(Math.random() * boardC.numCols);
        y = Math.floor(Math.random() * boardC.numRows);}
    while (computerHits.some(previousPos => previousPos[0] === x && previousPos[1] === y));
    computerHits.push([x,y]);
    console.log(computerHits);
    const hitResult = boardC.makeHit(x,y);

    //find square:

    const computerBoard = document.querySelectorAll('.grid-container')[1];
    const square = computerBoard.querySelector(`[data-row='${x}'][data-col='${y}']`)
    

    if (!hitResult) {
        square.classList.add('bgLightCoral');
    } else {
        square.classList.add('bgLightGreen');
        square.innerHTML = 
        `
            <p>${hitResult}</p>
        `
        ;
    }

    if (boardC.isGameOver()) {
        gameOver("COMPUTER WINS !");
    }

}

const gameOver = (whoWins) => {
    const squares = document.querySelectorAll('.grid-item');
    squares.forEach(square => square.removeEventListener('click', hit));
    const msg = document.getElementById('msg');
    msg.innerText = `${whoWins}`;
}

const buildGrid = (gridNumber) => {
    const gridContainer = document.querySelectorAll('.grid-container')[gridNumber];
    gridContainer.innerHTML = ""; // in case this function being called by reset

    for (let i = 0; i < board.numRows; i ++) {
        for (let j = 0; j < board.numCols; j++) {
            const square = document.createElement('div');
            square.classList.add('grid-item');
            square.setAttribute('data-row', i);
            square.setAttribute('data-col', j);

            if (gridNumber === 0) square.addEventListener('click', hit);
            gridContainer.append(square);
        }
    }
}

const reset = e => {
    e.preventDefault();
    board = new Board();
    boardC = new Board();
    buildGrid(0);
    buildGrid(1);

}