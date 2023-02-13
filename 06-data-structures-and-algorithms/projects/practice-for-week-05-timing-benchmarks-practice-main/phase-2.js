const [addNums, addManyNums] = require("./phase-1");

// Runs `addNums` in 10 increasing increments
function addNumsN(increment, n = 10) {
  let results = [];
  let start = increment;
  for (let i = 0; i < n; i++) {
    results.push(addNums(start));
    start += increment;
  }
  return results;

}

// Runs `addManyNums` in 10 increasing increments
function addManyN(increment, n = 10) {
  let results = [];
  let start = increment;
  for (let i = 0; i < n; i++) {
    results.push(addManyNums(start));
    start += increment;
  }
  return results
}

module.exports = [addNums10, addManyNums10];