function myMap(inputArray, callback) {
  // Your code here
  
  
  
  const newArr = [];
  inputArray.forEach(element => {
    newArr.push(callback(element));
  });
  return newArr

}

module.exports = myMap;