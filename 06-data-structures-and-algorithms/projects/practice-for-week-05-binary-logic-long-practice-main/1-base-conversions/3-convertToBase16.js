// Convert the integers in the console.logs below to base 16:

/******************************************************************************/

const convertToBase16 = element => {
  if (element < 10) return '0x' + (element / 1);
  if (element > 9 && element < 16) return '0x' + 'abcdef'[element % 10];
  return convertToBase16(parseInt(element / 16)) + convertX(element % 16);
};

const convertX = element => {
  if ((element / 1) < 10) return (element / 1);
  return 'abcdef'[element % 10];
}

/******************************************************************************/

console.log(convertToBase16(4)); // 0x4
console.log(convertToBase16(65)); // 0x41
console.log(convertToBase16(256)); // 0x100
console.log(convertToBase16(123)); // 0x7b
console.log(convertToBase16(1000)); // 0x3e8

console.log('––––––');

console.log(convertToBase16('0b1100')); // 0xc
console.log(convertToBase16('0b0101')); // 0x5
console.log(convertToBase16('0b1000')); // 0x8
console.log(convertToBase16('0b0111')); // 0x7

console.log('––––––');

console.log(convertToBase16('0b10100101')); // 0xa5
console.log(convertToBase16('0b11111111')); // 0xff
console.log(convertToBase16('0b01010101')); // 0x55
console.log(convertToBase16('0b00110011')); // 0x33