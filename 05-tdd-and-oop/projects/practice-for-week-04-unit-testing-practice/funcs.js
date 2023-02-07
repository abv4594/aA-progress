function isFive(num) {
  // Your code here
  return num === 5;
}

function isOdd(number) {
  // Your code here

  if (typeof(number) !== 'number') {
    throw new Error;
  } else {
    return (number % 2 !== 0)}

}

function myRange(min, max, step = 1) {
  // Your code here
  if (min > max) return [];
  let answer = [];
  for (let i = min; i <= max; i += step) {
    answer.push(i);
  }
  return answer;
}


module.exports = { isFive, isOdd, myRange };