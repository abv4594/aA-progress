//transpose an Array
function rotate(arr) {
    const maxRow = arr.length - 1;
    return arr[0].map((el, col) => arr.map((el, row) => arr[maxRow - row][col]))
}

//Find how many consecutive symbols is found in array
function findConsecutives(arr, symbol) {
    let maxCount = 0;
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === symbol) {
            count ++
        } else {
            if (count > maxCount) {
                maxCount = count
            }
            count = 0;
        }
    }
    return maxCount > count? maxCount: count
}

//Given an array, return all diagonals inclined to the right
function getDiagonals(arr) {
    const rows = arr.length;
    const cols = arr[0].length;
    const max = rows + cols - 2;
    let diags = [];
    for (let i = 0; i <= max; i ++) {
        let diag = [];
        for (let row = 0; row < rows; row ++) {
            for (let col = 0; col < cols; col ++) {
                if (row + col === i) diag.push(arr[row][col]);
            }
        }
        diags.push(diag);
    }
    return diags
}

module.exports = {
    rotate,
    findConsecutives,
    getDiagonals
}

// tests
//const testArr = [[1,2,3,4], [5,6,7,8], [9,10,11,12]];
//console.log(rotate(testArr));

//const testArr2 = [[1, 2], [3,4], [5,6], [7,8]];
//console.log(rotate(testArr2));

//
//const consecArr = [1,1,0,1,1,1];
//console.log(findConsecutives(consecArr,1))
//console.log(getDiagonals(testArr));
//console.log(getDiagonals(rotate(testArr)));
//console.log(getDiagonals(transpose(testArr)));