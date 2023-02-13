const { expect } = require('chai');
const { checkForMatches } = require('../class/bejeweled.js');

const Bejeweled = require("../class/bejeweled.js");
const Screen = require("../class/screen.js"); // for using q to quit

describe ('Bejeweled', function () {


  // Add tests for setting up a basic board
  let grid;
  const symbols = ['🥝', '🍓', '🥥', '🍇', '🍊', '🍋'];

  it('Set up a board 8 x 8 filled with bejweled symbols', function () {const newGrid = new Bejeweled();
    const gridCheck = (newGrid.grid.length === 8) && newGrid.grid.every(row => 
      row.every((el,i,row) => row.length === 8 && symbols.includes(el)));
    expect(gridCheck).to.be.true; 
    }
  )

  // Add tests for a valid swap that matches 3
  it('Test a valid swap that matches 3', function () {
    const grid = [['🥝', '🥥', '🍇', '🍇', '🍇', '🍋']];
    const reply = checkForMatches(grid);
    expect(reply).to.be.equal({0:[[2,5]]}); //Row 0: pos from 2 to 5 (not inclusive)
  });

  // Add tests for swaps that set up combos
  it('Tests for swaps that set up combos', function () {
    const grid = [['🥝', '🥥', '🍇', '🥝', '🥝', '🍋'],
                  ['🥝', '🥝', '🍇', '🍇', '🍇', '🍋'],
                  ['🥝', '🥥', '🍇', '🍇', '🍇', '🍋']];
    const reply = checkForMatches(grid);
    expect(reply).to.be.equal({2:[[0,1],[2,5],[5,6]], 
                               1:[[0,1],[2,5],[5,6]],
                               0:[[0,1],[5,6]]})
  });
  // Add tests to check if there are no possible valid moves
  it('Check if there no more possible moves', function(){
    const grid1 = [['🥝', '🥥', '🍇', '🥝', '🥝', '🍋'],
                   ['🥥', '🥝', '🥝', '🍇', '🍇', '🥝'],
                   ['🥝', '🥥', '🥝', '🍇', '🍇', '🍋']];

    const grid2 = 
    [ ['🥥', '🥥', '🍇', '🥝', '🥝', '🥥'],
      ['🥝', '🥝', '🍋', '🥥', '🍇', '🍋'],
      ['🥝', '🥥', '🥥', '🍇', '🍇', '🍋']];

      const reply1 = existMoves(grid1);
      const reply2 = existMoves(grid2);

      expect(reply1).to.be.equal(true);
      expect(reply2).to.be.equal(false);

  }) 
});

