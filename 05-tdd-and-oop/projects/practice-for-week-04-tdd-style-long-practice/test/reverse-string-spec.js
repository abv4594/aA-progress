// Your code here

const chai = require('chai');
const expect = chai.expect;
const reverseString = require('../problems/reverse-string.js');

describe ('Function reverse', function () {
    it ('reverses a simple word', function () {
        const word = 'fun';
        const answer = 'nuf';
        expect(reverseString(word)).to.deep.equal('nuf');
    });
});

describe ('Error handling', function () {
    it('should throw TypeError if input not string', function () {
        const word = 123;
        expect(()=>reverseString(word)).to.throw(TypeError);
    })
})
