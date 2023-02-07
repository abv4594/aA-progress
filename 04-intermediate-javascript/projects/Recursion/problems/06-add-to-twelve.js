/***********************************************************************
Write a recursive function called `addToTwelve` that will return true if there
are two adjacent numbers in the input array that can sum up to 12. Otherwise,
return false.

Examples:

addToTwelve([1, 3, 4, 7, 5]); // true
addToTwelve([1, 3, 4, 7, 6]); // false
addToTwelve([1, 11, 4, 7, 6]); // true
addToTwelve([1, 12, 4, 7, 6]); // false
addToTwelve([1]); // false
***********************************************************************/

// your code here
// base addToTwelve([n1]) // false
// addToTwelve ([n1, n2]) // n1 + n2 === 12
// addToTwelve ([n1, n2, n3]) // 

function addToTwelve(numbers) {
  if (numbers.length === 1) return false
  return (numbers[0]+numbers[1] === 12 || addToTwelve(numbers.slice(1)))
}

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = addToTwelve;
} catch (e) {
  module.exports = null;
}
