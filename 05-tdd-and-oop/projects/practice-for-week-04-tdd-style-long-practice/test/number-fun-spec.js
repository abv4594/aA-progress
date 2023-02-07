// Your code here
const chai = require('chai');
const expect = chai.expect;
const {returnsThree, reciprocal} = require('../problems/number-fun');

describe('Function returnsThree', function() {
    it('Function returns number 3', function () {
        const answer = returnsThree();
        expect(answer).to.deep.equal(3);

    });
});

describe('Function reciprocal', function () {

    context('valid argument', function () {

        it('It should return the reciprocal of a number', function (){
            const nums = [1,2,5];
            const answers = nums.map(num=>reciprocal(num));
            const solutions = [1, 1/2, 1/5];
            solutions.forEach((solution, i) => 
                expect(reciprocal(nums[i])).to.deep.equal(solution));

        });
    })

    context('not valid arguments', function() {
        it('Should return type error for inputs smaller then 1', function() {
            const num = -0.2;
            expect(()=>reciprocal(num)).to.throw(TypeError);
        });
        it('Should return type error for numbers bigger then 1,000,000', function() {
            const num = 1000001;
            expect(()=>reciprocal(num)).to.throw(TypeError);
        });
    } );


});

