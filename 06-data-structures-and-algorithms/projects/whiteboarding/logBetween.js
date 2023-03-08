function logBetween(lowNum, highNum) {
    let log = [];
    for (let i = lowNum; i <= highNum; i ++) {
        log.push(i);
    }
    return log;
}

console.log(logBetween(-1,2));
console.log(logBetween(14,6));
console.log(logBetween(4,6));

// time complexity: O(n)
// space complexity: O(n)
// 