const [addNums, addManyNums, addManyNumsR] = require("./phase-1");


function addManyNumsNTimingR(increment, n = 10) {
    const startTime = Date.now();
    let results = [];
    let start = increment;
    console.time("timer1");
    for (let i = 0; i < n; i++) {
        results.push(addManyNumsR(start));
        start += increment;
        //console.timeLog("timer1");
        const iTime = Date.now();
        console.log(`for ${i} : ${iTime - startTime}`);
    }
    console.timeEnd("timer1");
    const endTime = Date.now;
    return results

}

n = 1000
console.log(`addManyNums100 Recurring (${n}): `);
addManyNumsNTimingR(n, 100);