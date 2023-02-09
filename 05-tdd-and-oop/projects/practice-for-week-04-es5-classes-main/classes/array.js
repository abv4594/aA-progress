Array.prototype.isEqual = function (arr) {
    return arr.every((el,i) => el === this[i] );
}