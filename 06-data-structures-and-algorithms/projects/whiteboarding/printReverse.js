function printReverse(min, max) {
    let log = [];
    for (i = max - 1; i > min; i --) {
        log.push(i);
    }
    return log
}

console.log(printReverse(13,18));
console.log(printReverse(90,94));