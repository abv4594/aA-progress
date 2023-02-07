module.exports = function reverseString(string) {
  // Your code here
  if (typeof(string) !== 'string') {
    throw new TypeError;
  } else {
  return string.split('').reverse().join('');}
};