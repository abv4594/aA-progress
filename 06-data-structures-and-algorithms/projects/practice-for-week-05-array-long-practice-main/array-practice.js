const findMinimum = arr => {

  if (arr.length === 0) return undefined;
  return arr.reduce((acc,el) => {
    if (el < acc) return el
    else return acc
  })

  // time complexity O(n) - reduce will run over the array one by one (n times)
  // space complexity O(1) - new variables created are acc and el, no matter size of n 

};

const runningSum = arr => {

  let result = [];
  for (let i = 1; i <= arr.length; i++) {
    result.push(sumArr(arr.slice(0,i)))
  }
  return result

  //time complexity O(nˆ2): you have the outer loop running from 1 to n+1 and inside each interaction
  // ... you run from 0 to i > in the last case i = n and inner sum will run from 0 to n (resulting nˆ2)
  // space complexity is O(n) reflecting the new array created

};

const sumArr = arr => {
  return arr.reduce((acc, el) => acc + el);
}

const evenNumOfChars = arr => {

  return arr.reduce((acc,el) => {
    if (el.length % 2 === 0) acc++;
    return acc
  },0);

  // time complexity O(n) - running over each element one by one once
  // space complexity O(1) - no matter n there will always only be acc, el

};

const smallerThanCurr = arr => {
let result = [];
for (let i = 0; i < arr.length; i++) {
  result.push(smallerThen(arr, arr[i]));
}
return result;
// time complexity O(nˆ2) - outer loop run from 0 to n and for each interaction
// of outer loop we run from 0 to n also. nˆ2;
// space complexity O(n);

}

const smallerThen = (arr, n) => {
  return arr.reduce((acc, el) => {
    if (el < n) acc++;
    return acc
  },0);
}

const twoSum = (arr, target) => {

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) return true;
    }
  }
  return false

  // time complexity O(nˆ2) - outter and inner loop from 0 to n
  // space complexity O(1) - no matter n we are using fixed space

};

const secondLargest = arr => {


  if (arr.length < 2) return undefined;

  const max = findMax(arr);

  return arr.reduce((acc, el) => {
    if (acc === max) return el;
    if (el === max) return acc;
    if (el > acc) return el;
    return acc;
  })

  // time complexity: O(n) => we run a loop with n to find max. Then we run once again
  // ... a loop n times to find the second largest. So it's 2 x n => O(n)
  // space complexity: O(1) => we have a couple of unidimensional variable. This doesn't 
  // ... change with n

};

const findMax = arr => {
  return arr.reduce((acc, el) => {
    if (el > acc) return el;
    return acc
  })
}

const shuffle = (arr) => {


  const newArr = arr.slice(); // copy, space complexity till now O(n)
  const max = arr.length; // if arr has 5 elements, we want random between 0 and 4 (max is exclusive)
  for (let i = 0; i < arr.length; i ++) {
    
    // generate a random index to swith with current element
    // let's say i = 0. We generate a random number between 0 and 4. Let's say 4.
    // we add this random to i. We get 4. Then we do module 5. So end up with 4. 
    // so we switch newArr[0] with newArr[4] -> no change
    const idxRandom = (i + Math.floor(Math.random() * max))% max;
    
    // switch elements
    const elToChange = newArr[idxRandom];
    newArr[idxRandom] = newArr[i];
    newArr[i] = elToChange;
    
  }

  return newArr;

  // space complexity O(n) -> we create a new variable newArr which grows linearly with n (size of arr)
  // time complexity O(n) -> we run a loop from 0 to n and generate a switching random number each passage.


};


module.exports = [findMinimum, runningSum, evenNumOfChars, smallerThanCurr, twoSum, secondLargest, shuffle];