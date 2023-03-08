function fizzBuzz(n) {
    let answer = [];
    for (let i = 0; i < n; i ++) {
        if ((i % 3 !== 0) && (i % 5 !== 0)) continue;
        if ((i % 3 === 0) && (i % 5 === 0)) continue;
        if ((i % 3 === 0) || (i % 5 === 0)) answer.push(i);
    }
    return answer
}

console.log(fizzBuzz(20));