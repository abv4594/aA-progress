const [addNums, addManyNums] = require("./phase-1");

function addNumsNTiming(increment, n = 10) {
  let results = [];
  let start = increment;
  const startTime = Date.now();
  console.time("timer");
  for (let i = 0; i < n; i++) {
    results.push(addNums(start));
    start += increment;
    //console.timeLog("timer");
    const iTime = Date.now();
    console.log(`for ${i} : ${iTime - startTime}`);
  }
  console.timeEnd("timer");
  return results;

}


function addManyNumsNTiming(increment, n = 10) {
  const startTime = Date.now();
  let results = [];
  let start = increment;
  console.time("timer1");
  for (let i = 0; i < n; i++) {
    results.push(addManyNums(start));
    start += increment;
    //console.timeLog("timer1");
    const iTime = Date.now();
    console.log(`for ${i} : ${iTime - startTime}`);
  }
  console.timeEnd("timer1");
  const endTime = Date.now;
  return results

}

console.log("\n***********\n");

n = 1000000
console.log(`addNums10(${n}): `);
addNumsNTiming(n);

console.log("\n***********\n");

n = 1000
console.log(`addManyNums10(${n}): `);
addManyNumsNTiming(n);

//

console.log("\nFor 100 >>>>>> ***********\n");

n = 1000000
console.log(`addNums100(${n}): `);
addNumsNTiming(n, 100);

console.log("\n***********\n");

n = 1000
console.log(`addManyNums100(${n}): `);
addManyNumsNTiming(n, 100);
