function logBetweenStepper(min, max, step) {
    let log = [];
    for (let i = min; i <= max; i += step) {
        log.push(i);
    }
    return log;
}

console.log(logBetweenStepper(5,9,1));
console.log(logBetweenStepper(-10,15,5));