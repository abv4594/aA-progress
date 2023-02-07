/***********************************************************************
Write a recursive method permutations(array) that calculates all the
permutations of the given array. For an array of length n there are n! different
permutations. So for an array with three elements we will have 3 * 2 * 1 = 6
different permutations.

Examples:

permutations([1, 2]) // [[1, 2], [2, 1]]
permutations([1, 2, 3]) // [[1, 2, 3], [1, 3, 2],
                        // [2, 1, 3], [2, 3, 1],
                        // [3, 1, 2], [3, 2, 1]]
***********************************************************************/

// your code here

const permutations = (arr) => {

  if (arr.length === 1) return arr;
  
  const answer = [];

  for (let i = 0; i < arr.length; i++) {
    
    const pivot = [arr[i]]; // fixed element
    const arr2 = arr.slice(); // copy array
    arr2.splice(i,1); // removes the pivot from copied array
    permutations(arr2).forEach(permutation => answer.push(pivot.concat(permutation)));
    
  }

  return answer

}

const arr = [1,2,3];

console.log(permutations(arr));


/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = permutations;
} catch (e) {
  module.exports = null;
}
