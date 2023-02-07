/***********************************************************************
Write a recursive function that will find the best way to make change from a
given set of coin values for a given amount of money. The set of coin values
should default to using pennies (1 cent), nickels (5 cents), dimes (10 cents),
and quarters (25 cents). Return `null` if there are no possible ways to make
change for the given target amount.

Examples:

makeChange(21); // [1, 10, 10]
makeChange(75); // [25, 25, 25]
makeChange(33, [15, 3]); // [3, 15, 15]
makeChange(34, [15, 3]); // null
makeChange(24, [10, 7, 1]) // [7, 7, 10]

Here's a game plan for solving the problem:

First, write a 'greedy' version called `greedyMakeChange`:

Take as many of the biggest coin as possible and add them to your result.
Add to the result by recursively calling your method on the remaining amount,
leaving out the biggest coin, until the remainder is zero.
Once you have a working greedy version, talk with your partner about refactoring
this to `makeBetterChange`. What's wrong with `greedyMakeChange`?

Consider the case of `greedyMakeChange(24, [10,7,1])`. Because it takes as many
10 pieces as possible, `greedyMakeChange` misses the correct answer of
`[10,7,7]` (try it in node).

To `makeBetterChange`, we only take one coin at a time and never rule out
denominations that we've already used. This allows each coin to be available
each time we get a new remainder. By iterating over the denominations and
continuing to search for the best change, we assure that we test for
'non-greedy' uses of each denomination.

Discuss the following game plan and then work together to implement your
new method:

- Iterate over each coin.
- Grab only one of that one coin and recursively call `makeBetterChange` on the
  remainder using coins less than or equal to the current coin.
- Add the single coin to the change returned by the recursive call. This will be
  a possible solution, but maybe not the best one.
- Keep track of the best solution and return it at the end.

N.B. Don't generate every possible permutation of coins and then compare them.
Remember that a permutation is not the same thing as a combination - we will
need to check every combination of coins that add up to our target, we just
don't want to check the same combination in different orders. If you get stuck
you can start by writing a solution that calculates and compares all of the
permutations without storing them in an array. Then go back and refactor your
solution so that it only calculates and compares all of the different
combinations.
***********************************************************************/

function greedyMakeChange(target, coins = [25, 10, 5, 1]) {
  // no tests for greedyMakeChange so make sure to test this on your own
  // your code here

  if (coins.length === 0) return null;

  const possibleCoins = coins.filter(coin => coin <= target);
  const highest = possibleCoins[0];
  const nextCoins = possibleCoins.slice(1);

  let sum = 0;
  const solution = [];

  while (sum < target) {
    sum+=highest;
    solution.push(highest);
  }

  if (sum === target) return solution;
  if (sum > target) {
    solution.pop();
    const rest = greedyMakeChange(target - sum + highest, nextCoins);
    if (!rest) return null;
    if (rest.includes(null)) return null
    return solution.concat(rest);
  }

}

//console.log(greedyMakeChange(21));

//console.log(greedyMakeChange(24, [10,7,1]));

//console.log(greedyMakeChange(34,[15,3]));


function makeBetterChange(target, coins = [25,10,5,1]) {

  const combinations = makeBetterChangeCombinations(target, coins);

  if (!combinations) return null;

  let targetCombination = combinations[0];

  combinations.forEach(combination => {
    if (combination.length < targetCombination.length) {
      // change
      targetCombination = combination;
    }
  })

  return targetCombination;


}


// function below returns all possible combinations in an array

function makeBetterChangeCombinations(target, coins = [25, 10, 5, 1]) {

  const usefulCoins = coins.filter(coin => coin <= target); // filter out coins > target
  if (usefulCoins.length === 0) return null; // no coins and still a target so return null
  const coin = usefulCoins[0]; // the first coin to test (a requirement)

  if (usefulCoins.length === 1) { // base case
    if (target % coin === 0) {
      return [Array(target/coin).fill(coin)]
    } else {
      return null
    }
  }

  // i is the max number of coin that can fit into target
  let i = parseInt(target/coin);
  
  let combinations = [] // will store all possible combinations

  while (i>=0) {
    //main loop
    const factor = coin * i;
    const rest = target - factor;
    if (rest === 0) combinations.push((Array(i).fill(coin))) // found!
    else { // this coin alone doesn't work, look for the rest
      const tryRest = makeBetterChangeCombinations(rest,usefulCoins.slice(1));
      if (tryRest) {// means a combination was found
        //tryRest will also be a combination, so we need to iterate over it
        //and cobine each one with the current set of coins (coins * i)
        tryRest.forEach(combination => combinations.push((Array(i).fill(coin)).concat(combination)))
      
      }
    }
    // keep decreasing i 
    i--;
  }
  if (combinations.length === 0) return null
  return combinations;
}

console.log(makeBetterChange(21));
console.log(makeBetterChange(75));
console.log(makeBetterChange(33, [15, 3]));
console.log(makeBetterChange(24, [10, 7, 1]));
console.log(makeBetterChange(34, [15, 3]));


/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = makeBetterChange
} catch (e) {
  module.exports = null;
}

