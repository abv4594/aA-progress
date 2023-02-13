// Convert the integers in the console.logs below to base 10:

/******************************************************************************/

const xbTable = {
  0:0,
  1:1,
  2:2,
  3:3,
  4:4,
  5:5,
  6:6,
  7:7,
  8:8,
  9:9,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15
}

const convertToBase10 = str => {
  const numberStr = str.slice(2);
  const base = (str[1] === 'x')? 16 : 2;
  const maxExp = numberStr.length - 1;
  let num = 0;
  for (let i = 0; i < numberStr.length; i++) {
    const exp = maxExp - i;
    num += xbTable[numberStr[i]] * (base ** exp);
  }
  return num
};

/******************************************************************************/
/*
console.log(convertToBase10('0b1100')); // 12
console.log(convertToBase10('0b0101')); // 5
console.log(convertToBase10('0b1000')); // 8
console.log(convertToBase10('0b0111')); // 7

console.log('––––––');

console.log(convertToBase10('0b10100101')); // 165
console.log(convertToBase10('0b11111111')); // 255
console.log(convertToBase10('0b01010101')); // 85
console.log(convertToBase10('0b00110011')); // 51

console.log('––––––');

console.log(convertToBase10('0xf')); // 15
console.log(convertToBase10('0xfa')); // 250
console.log(convertToBase10('0x1234')); // 4660
console.log(convertToBase10('0xc9a1')); // 51617
console.log(convertToBase10('0xbf12')); // 48914
*/

module.exports = convertToBase10;