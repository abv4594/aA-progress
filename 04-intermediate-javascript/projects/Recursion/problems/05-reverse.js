/***********************************************************************
Write a recursive function reverse(string) that takes in a string and returns
it reversed.

Examples:

reverse("house"); // "esuoh"
reverse("dog"); // "god"
reverse("atom"); // "mota"
reverse("q"); // "q"
reverse("id"); // "di"
reverse(""); // ""
***********************************************************************/

// your code here

//base case: reverse(''); // ''
//case 1: reverse('a'); // 'a'
//case 2: reverse('ab'); 'b' + reverse('ab'.slice(0,-1))

function reverse(str) {
  if (str === '') return ''
  return (str.slice(-1) + reverse(str.slice(0,-1)))
}

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = reverse;
} catch (e) {
  module.exports = null;
}
