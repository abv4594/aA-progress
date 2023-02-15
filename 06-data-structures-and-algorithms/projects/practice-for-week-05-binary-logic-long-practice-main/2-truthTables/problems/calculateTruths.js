const { or, and, calculateTruthTable } = require('../../utils/truthTableHelpers');

// Implement the imported helper functions from line 1
//    Read the export file for the explanation of how they work

// Example workflow for the problem directly below:
//    A    B     !A || (A && B)
//    -------------------
//    0    1      ?

//    1. !A -> 1
//    2. calculateTruthTable(0, and, 1) -> 0
//    3. calculateTruthTable(1, or, 0) -> 1
//    4. Answer: 1

/******************************************************************************/

const ab = [[0,0],[0,1],[1,0],[1,1]];

const c = [0,1];

const abc = []

ab.forEach(pair => {
    c.forEach(digit => {
        abc.push(pair.concat(digit));
    })
})


console.log('A    B     !A || (A && B)');
console.log('--------------------');
ab.forEach(pair => {
    const notA = (pair[0] === 0)? 1 : 0;
    const aAndB = calculateTruthTable(pair[0], and, pair[1]);
    const result = calculateTruthTable(notA, or, aAndB);
    console.log(`${pair[0]}   ${pair[1]}      ${result}`);
})

console.log('');

console.log('A    B     B || !A');
console.log('--------------------');
ab.forEach(pair => {
    const notA = (pair[0] === 0)? 1 : 0;
    const result = calculateTruthTable(pair[1], or, notA);
    console.log(`${pair[0]}   ${pair[1]}      ${result}`);
})

console.log('');

console.log('A    B!(A && !B)');
console.log('--------------------');

ab.forEach(pair => {
    const notB = (pair[1] === 0) ? 1 : 0;
    const result = calculateTruthTable(pair[0], and, notB);
    const notResult = (result === 0)? 1 : 0;
    console.log(`${pair[0]}   ${pair[1]}      ${notResult}`);

})

console.log('');

console.log('A    B     A || !A');
console.log('--------------------');

ab.forEach(pair => {
    const notA = (pair[0] === 0) ? 1 : 0;
    const result = calculateTruthTable(pair[0], or, notA);
    console.log(`${pair[0]}   ${pair[1]}      ${result}`);
});

console.log('');

console.log('A    B     B && !B');
console.log('--------------------');

ab.forEach(pair => {
    const notB = (pair[1] === 0) ? 1 : 0;
    const result = calculateTruthTable(pair[1], and, notB);
    console.log(`${pair[0]}   ${pair[1]}      ${result}`);

});

console.log('');

console.log('A    B    C     A && B || !C');
console.log('--------------------');
abc.forEach(trio => {
    const notC = (trio[2] === 0) ? 1 : 0;
    const result_left = calculateTruthTable(trio[0], and, trio[1]);
    const result = calculateTruthTable(result_left, or, notC);
    console.log(`${trio[0]}   ${trio[1]}     ${trio[2]}      ${result}`);

});

console.log('');

console.log('A    B    C     !A || (B && C)');
console.log('--------------------');
abc.forEach(trio => {
    const notA = (trio[0] === 0) ? 1 : 0;
    const resultRight = calculateTruthTable(trio[1], and, trio[2]);
    const result = calculateTruthTable(notA, or, resultRight);
    console.log(`${trio[0]}   ${trio[1]}     ${trio[2]}      ${result}`);

});



// Update arguments to calculate and console.log returned value
//calculateTruthTable(0, and, 1); // 0
//calculateTruthTable(1, or, 0); // 1